import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import { isExternalWebLink } from "@/data/release-notes";

interface ReleaseNotesProps {
  /** Markdown of a GitHub release. Untrusted: raw HTML is shown as text. */
  content: string;
  /** `owner/name`, resolves `#123` and `@user` references. */
  repository: string;
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
          h1: ({ children }) => <h4>{children}</h4>,
          h2: ({ children }) => <h4>{children}</h4>,
          h3: ({ children }) => <h5>{children}</h5>,
          h4: ({ children }) => <h6>{children}</h6>,
          h5: ({ children }) => <h6>{children}</h6>,
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
        remarkPlugins={[remarkGfm, [remarkGithub, { repository }]]}
      >
        {content}
      </Markdown>
    </div>
  );
}
