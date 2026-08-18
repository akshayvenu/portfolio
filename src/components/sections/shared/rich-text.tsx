import { Fragment, type ReactNode } from "react";

const EMPHASIS = /\*\*(.+?)\*\*/g;

/**
 * Renders the one piece of inline markup the content layer allows: `**text**`.
 *
 * Emphasised spans get the kit's underline treatment. This parses into real
 * React nodes rather than `dangerouslySetInnerHTML`, so content can never
 * inject markup.
 */
export function RichText({ children }: { children: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of children.matchAll(EMPHASIS)) {
    const start = match.index;
    if (start > cursor) nodes.push(children.slice(cursor, start));
    nodes.push(
      <strong key={start} className="link-underline font-medium text-inherit">
        {match[1]}
      </strong>,
    );
    cursor = start + match[0].length;
  }

  if (cursor < children.length) nodes.push(children.slice(cursor));

  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </>
  );
}
