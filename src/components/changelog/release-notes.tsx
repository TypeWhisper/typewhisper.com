import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import { isExternalWebLink, noteHeadingLevels } from "@/data/release-notes";

interface ReleaseNotesProps {
  /** Markdown of a GitHub release. Untrusted: raw HTML is shown as text. */
  content: string;
  /** `owner/name`, resolves `#123` and `@user` references. */
  repository: string;
}

interface MarkdownNode {
  type: string;
  depth?: number;
  children?: MarkdownNode[];
  data?: { hName?: string; hProperties?: Record<string, unknown> };
}

/** Remark plugin: gives every heading its element and its look. */
function remarkNoteHeadings() {
  return (tree: MarkdownNode) => {
    const headings: MarkdownNode[] = [];
    const collect = (node: MarkdownNode) => {
      if (node.type === "heading") headings.push(node);
      node.children?.forEach(collect);
    };
    collect(tree);
    const levels = noteHeadingLevels(headings.map((node) => node.depth ?? 6));
    headings.forEach((node, index) => {
      node.data = {
        ...node.data,
        hName: `h${levels[index].level}`,
        hProperties: { "data-look": levels[index].look },
      };
    });
  };
}

/**
 * Release notes as static HTML. Rendered on the server only; `react-markdown`
 * never passes raw HTML through, and only absolute web links stay links.
 */
export function ReleaseNotes({ content, repository }: ReleaseNotesProps) {
  return (
    <div className="site-prose utility-notes">
      <Markdown
        components={{
          // Unsafe and repository-relative addresses stay plain text.
          a: ({ href, title, children }) =>
            isExternalWebLink(href) ? (
              <a
                href={href}
                title={title}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ) : (
              <>{children}</>
            ),
          // Pictures would load from a third party; the notes link to GitHub instead.
          img: ({ alt }) => <>{alt}</>,
        }}
        remarkPlugins={[
          remarkGfm,
          [remarkGithub, { repository }],
          remarkNoteHeadings,
        ]}
      >
        {content}
      </Markdown>
    </div>
  );
}
