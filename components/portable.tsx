import { PortableText, type PortableTextComponents } from "@portabletext/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any;

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

export const blockText = (b: Block) => (b?.children || []).map((c: Block) => c.text || "").join("");

/** H2 headings, used for the table of contents. */
export const headings = (body: Block[] = []) =>
  body.filter((b) => b._type === "block" && b.style === "h2").map((b) => ({ text: blockText(b), id: slugify(blockText(b)) }));

const components: PortableTextComponents = {
  block: {
    h1: ({ children, value }) => <h2 id={slugify(blockText(value))}>{children}</h2>,
    h2: ({ children, value }) => <h2 id={slugify(blockText(value))}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={slugify(blockText(value))}>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href || "#";
      const external = /^https?:\/\//.test(href) && !href.includes("stacknarrative.com");
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${value.url}?w=1400&auto=format`} alt={value.alt || ""} loading="lazy" />
          {value.alt && <figcaption>{value.alt}</figcaption>}
        </figure>
      ) : null,
  },
};

export default function Portable({ value }: { value?: Block[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
