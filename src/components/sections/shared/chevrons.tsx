import { Icon } from "@/components/icons";

/** Expand/collapse affordance for collapsible list rows. */
export function Chevrons({ open }: { open: boolean }) {
  return (
    <Icon
      name={open ? "chevrons-down-up" : "chevrons-up-down"}
      size={15}
      className="shrink-0 text-muted-foreground"
    />
  );
}
