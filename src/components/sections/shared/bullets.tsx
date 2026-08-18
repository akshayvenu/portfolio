interface BulletsProps {
  items: readonly string[];
}

/** Dot-led prose list used inside expanded roles, projects and education. */
export function Bullets({ items }: BulletsProps) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-[1.6]">
          <span aria-hidden="true" className="shrink-0 text-bullet">
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
