import { describe, expect, it } from "vitest";

import {
  buildEmbed,
  discordMd,
  discordPayload,
  discordTag,
  pageKind,
} from "./discordEmbed.js";
import type { DiscordComponent, PageKind } from "./discordEmbed.js";

const ORIGIN = "https://example.com";
const BASE = "/frontend";
const ALLOWED = [1, 2, 9, 10, 11, 12, 14, 17];

interface Node {
  type: number;
  components?: Array<Node>;
  accessory?: Node;
  [key: string]: unknown;
}

function flatten(c: Node): Array<Node> {
  const kids = [...(c.components ?? []), ...(c.accessory ? [c.accessory] : [])];
  return [c, ...kids.flatMap(flatten)];
}

function page(kind: PageKind, title = "Stats Card", description = "A card.") {
  return { kind, title, description, url: `${ORIGIN}${BASE}/docs/x/` };
}

function assertValid(json: string | null): { component: Node } {
  expect(json).not.toBeNull();
  expect(new TextEncoder().encode(json ?? "").length).toBeLessThanOrEqual(3000);
  const payload = JSON.parse(json ?? "null") as { component: Node };
  expect(Object.keys(payload)).toEqual(["component"]);
  expect(payload.component.type).toBe(17);
  const all = flatten(payload.component);
  expect(all.length).toBeLessThanOrEqual(40);
  for (const c of all) {
    expect(ALLOWED).toContain(c.type);
    if (c.type === 17) {
      expect(c).toBe(payload.component);
    }
    if (c.type === 2) {
      expect(c.style).toBe(5);
      const extra = Object.keys(c).filter(
        (k) =>
          ![
            "id",
            "type",
            "url",
            "style",
            "label",
            "emoji",
            "disabled",
          ].includes(k),
      );
      expect(extra).toEqual([]);
      expect(c.url).toMatch(/^https?:\/\//);
    }
  }
  return payload;
}

describe("discord component embed", () => {
  it("is valid for every page type", () => {
    for (const kind of ["wizard", "docs-home", "card", "page"] as const) {
      assertValid(buildEmbed(ORIGIN, BASE, page(kind)));
    }
  });

  it("classifies pages", () => {
    expect(pageKind("docs/cards/stats", false)).toBe("card");
    expect(pageKind("docs", false)).toBe("docs-home");
    expect(pageKind("docs/deploy", false)).toBe("page");
    expect(pageKind("index", true)).toBe("wizard");
  });

  it("escapes Discord markdown and never prints $1", () => {
    expect(discordMd("**b** [x](y) a_b ~~s~~ `c` ||p|| \\")).toBe(
      "\\*\\*b\\*\\* \\[x\\](y) a\\_b \\~\\~s\\~\\~ \\`c\\` \\|\\|p\\|\\| \\\\",
    );
    expect(discordMd("# h\n- l\n> q\nmid # - >")).toBe(
      "\\# h\n\\- l\n\\> q\nmid # - >",
    );
    const json = buildEmbed(ORIGIN, BASE, page("page", "A_b *c*", "# no"));
    expect(json).toContain("A\\\\_b \\\\*c\\\\*");
    expect(json).not.toContain("$1");
  });

  it("cannot close the script tag early", () => {
    const tag = discordTag(
      buildEmbed(ORIGIN, BASE, page("page", "</script><b>x")),
    );
    expect(tag.split("</script>")).toHaveLength(2);
    expect(tag.endsWith("</script>")).toBe(true);
  });

  it("is left out when over the limit", () => {
    const big: Array<DiscordComponent> = [
      { type: 10, content: "x".repeat(3100) },
    ];
    expect(discordPayload(big)).toBeNull();
    expect(discordTag(null)).toMatch(/^<!-- discord:component-embed left out/);
  });
});
