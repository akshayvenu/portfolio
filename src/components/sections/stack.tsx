import { Panel, PanelHeader, PanelTitle, StackBadge } from "@/components/ui";
import { techStack } from "@/content";

/**
 * Tech stack as a numbered two-column table. The dashed rule sits on its own
 * layer behind the rows so it runs unbroken through the whole section rather
 * than being redrawn per row.
 */
export function Stack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-48 z-[-1] hidden w-px border-r border-dashed border-line sm:block"
        />

        {techStack.map((group, index) => (
          <div
            key={group.category}
            className="grid grid-cols-1 items-start gap-2 border-b border-line py-4 last:border-b-0 sm:grid-cols-[192px_1fr]"
          >
            <div className="pl-4 text-sm leading-6">
              <span aria-hidden="true" className="mr-1.5 font-mono text-ordinal select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              {group.category}
            </div>

            <ul className="m-0 flex list-none flex-wrap gap-1.5 px-4">
              {group.items.map((item) => (
                <li key={item} className="flex">
                  <StackBadge>{item}</StackBadge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}
