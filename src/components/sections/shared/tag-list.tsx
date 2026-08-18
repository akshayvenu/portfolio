import { Tag } from "@/components/ui";
import { cn } from "@/lib/utils";

interface TagListProps {
  skills: readonly string[];
  className?: string;
}

/** Wrapped list of skill pills. Renders nothing when there are no skills. */
export function TagList({ skills, className }: TagListProps) {
  if (skills.length === 0) return null;

  return (
    <ul className={cn("m-0 flex list-none flex-wrap gap-1.5 p-0", className)}>
      {skills.map((skill) => (
        <li key={skill} className="flex">
          <Tag>{skill}</Tag>
        </li>
      ))}
    </ul>
  );
}
