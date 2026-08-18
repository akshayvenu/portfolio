import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelHeader, PanelTitle } from "@/components/ui";
import { certifications } from "@/content";
import type { Certification } from "@/types/content";
import { MetaSeparator } from "./shared";

function isRealLink(href: string): boolean {
  return href.length > 0 && href !== "#";
}

/**
 * Credential row. When a verification URL exists the title anchor is stretched
 * over the whole row with an absolutely positioned overlay, so the entire card
 * is clickable while the accessible name stays just the title.
 */
function CertificationItem({ cert }: { cert: Certification }) {
  const linked = isRealLink(cert.href);

  return (
    <div className="relative flex items-center border-b border-line pr-2 transition-colors duration-150 hover:bg-accent-muted">
      <IconTile className="mx-4">
        <Icon name="circle-check-big" size={13} />
      </IconTile>

      <div className="flex flex-1 flex-col gap-1 border-l border-dashed border-line py-4 pr-2 pl-4">
        <h3 className="m-0 text-base leading-[1.35] font-medium">
          {linked ? (
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline"
            >
              <span aria-hidden="true" className="absolute inset-0" />
              {cert.title}
            </a>
          ) : (
            cert.title
          )}
        </h3>

        <dl className="m-0 flex flex-wrap items-center gap-x-2 gap-y-0 text-sm text-muted-foreground">
          <dd className="m-0">
            <span aria-hidden="true">@</span>
            <span className="ml-0.5">{cert.issuer}</span>
          </dd>
          <MetaSeparator />
          <dd className="m-0 tabular-nums">{cert.date}</dd>
        </dl>
      </div>

      <Icon name="arrow-up-right" size={15} className="shrink-0 text-muted-foreground" />
    </div>
  );
}

export function Certifications() {
  return (
    <Panel id="certifications" noBottomLine>
      <PanelHeader>
        <PanelTitle>
          Certifications
          <sup className="ml-0.5 text-[0.45em] font-normal text-muted-foreground">
            ({certifications.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      {certifications.map((cert) => (
        <CertificationItem key={cert.title} cert={cert} />
      ))}
    </Panel>
  );
}
