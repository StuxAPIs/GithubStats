/*
 * Discord component embed: a custom link preview, as JSON in a
 * `<script id="discord:component-embed">` tag. The Open Graph tags stay as its fallback.
 * https://docs.discord.com/developers/link-previews/component-embeds
 */

export const DISCORD_EMBED_MAX_BYTES = 3000;
export const DISCORD_COLOUR = "#ff4444";
export const SITE_NAME = "GitHub Stats Extended";
export const SITE_TAGLINE =
  "Dynamically generate GitHub stats for your READMEs.";

export interface DiscordComponent {
  type: number;
  [key: string]: unknown;
}

/** Escapes Discord markdown so data (names, descriptions) shows as plain text. */
export function discordMd(s: string): string {
  // Inline formatting, link brackets and backslashes anywhere; headings, quotes and lists only at a line start.
  return s.replace(/([\\*_~`|[\]])/g, "\\$1").replace(/^([#>-])/gm, "\\$1");
}

function text(markdown: string): DiscordComponent {
  return { type: 10, content: markdown };
}

/** A row of link buttons: [label, absolute URL] pairs. */
function buttons(links: Array<[string, string]>): DiscordComponent {
  return {
    type: 1,
    components: links.map(([label, url]) => ({
      type: 2,
      style: 5,
      label: label.slice(0, 80),
      url,
    })),
  };
}

/** Text with the site icon beside it. */
function section(markdown: string, iconUrl: string): DiscordComponent {
  return {
    type: 9,
    components: [text(markdown)],
    accessory: { type: 11, media: { url: iconUrl } },
  };
}

/** Encodes a payload, or returns null when it is over Discord's 3,000-byte limit. */
export function discordPayload(
  components: Array<DiscordComponent>,
  accent: string = DISCORD_COLOUR,
): string | null {
  const payload = {
    component: {
      type: 17,
      accent_color: parseInt(accent.replace("#", ""), 16),
      components,
    },
  };
  // `<\/` cannot close the <script> early; JSON decodes it back to `</`.
  const json = JSON.stringify(payload).replaceAll("</", "<\\/");
  return new TextEncoder().encode(json).length > DISCORD_EMBED_MAX_BYTES
    ? null
    : json;
}

/** The <script> tag, or a comment when the payload is over the limit. */
export function discordTag(json: string | null): string {
  return json === null
    ? `<!-- discord:component-embed left out: over ${DISCORD_EMBED_MAX_BYTES} bytes -->`
    : `<script id="discord:component-embed" type="application/json">${json}</script>`;
}

export type PageKind = "wizard" | "docs-home" | "card" | "page";

export interface EmbedPage {
  kind: PageKind;
  title: string;
  description: string;
  /** Absolute URL of the page. */
  url: string;
}

/**
 * @param origin - Absolute site origin, e.g. `https://github-stats-extended.vercel.app`.
 * @param base - Base path without trailing slash, e.g. `/frontend`.
 * @param page - The page to describe.
 * @returns The embed JSON, or null when over the size limit.
 */
export function buildEmbed(
  origin: string,
  base: string,
  page: EmbedPage,
): string | null {
  const site = `${origin}${base}`;
  const icon = `${site}/icon-512.png`;
  const label = `-# [${SITE_NAME}](${site}/docs/)\n`;
  const docs: [string, string] = ["Docs", `${site}/docs/`];
  const wizard: [string, string] = ["Card wizard", `${site}/`];

  if (page.kind === "wizard") {
    return discordPayload([
      section(
        `# [${SITE_NAME}](${page.url})\n**Card wizard**\nPick a card, tweak the options and copy the markdown for your GitHub profile README.`,
        icon,
      ),
      { type: 14 },
      text("### Cards\nStats · Top languages · Repo pin · Gist pin · WakaTime"),
      buttons([wizard, docs]),
    ]);
  }
  if (page.kind === "docs-home") {
    return discordPayload([
      section(
        `# [${SITE_NAME}](${page.url})\n**${SITE_TAGLINE}**\nStats, top-languages, repo, gist and WakaTime cards for your READMEs, with themes, locales and many options. Free to use, or deploy your own.`,
        icon,
      ),
      { type: 14 },
      text(
        `### Start here\n[Stats card](${site}/docs/cards/stats/) · [Themes](${site}/docs/customization/themes/) · [Deploy your own](${site}/docs/deploy/)`,
      ),
      buttons([docs, wizard]),
    ]);
  }
  const heading = `${label}## [${discordMd(page.title)}](${page.url})\n${discordMd(page.description)}`;
  return discordPayload([
    section(page.kind === "card" ? `${heading}\n-# Card` : heading, icon),
    buttons([["Open", page.url], docs, wizard]),
  ]);
}

/** Classifies a Starlight page by its content id (`docs/cards/stats`, `docs`, ...). */
export function pageKind(id: string, isWizard: boolean): PageKind {
  if (isWizard) {
    return "wizard";
  }
  if (id === "docs" || id === "docs/index") {
    return "docs-home";
  }
  return id.startsWith("docs/cards/") ? "card" : "page";
}
