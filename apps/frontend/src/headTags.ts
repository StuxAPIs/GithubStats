/*
 * The favicon set, as Starlight `head` entries: one shared list, so every page
 * (docs, wizard, 404) prints identical tags. The files live in `public/`.
 */
export interface HeadTag {
  tag: "link" | "meta";
  attrs: Record<string, string>;
}

const THEME_COLOUR = "#ff4444";

/**
 * @param base - The site's base path, e.g. `/frontend`, without a trailing slash.
 */
export function faviconTags(base: string): Array<HeadTag> {
  return [
    {
      tag: "link",
      attrs: { rel: "icon", href: `${base}/favicon.ico`, sizes: "48x48" },
    },
    {
      tag: "link",
      attrs: {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: `${base}/icon-512.png`,
      },
    },
    {
      tag: "link",
      attrs: { rel: "apple-touch-icon", href: `${base}/apple-touch-icon.png` },
    },
    {
      tag: "link",
      attrs: { rel: "manifest", href: `${base}/site.webmanifest` },
    },
    { tag: "meta", attrs: { name: "theme-color", content: THEME_COLOUR } },
  ];
}
