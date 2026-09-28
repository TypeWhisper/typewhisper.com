import { Fragment, type ReactNode } from "react";

/** Sets `code` spans of a frontmatter string as inline code. */
export function inline(text: string): ReactNode {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="usecase-code">
        {part}
      </code>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
