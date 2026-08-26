import { brandIcons } from "@/components/icons";
import { Panel, PanelSrTitle } from "@/components/ui";
import { socialLinks } from "@/content";

export function SocialLinks() {
  return (
    <Panel noTopLine>
      <PanelSrTitle>Social links</PanelSrTitle>
      <div className="relative flex gap-2 p-4">
        {socialLinks.map((link) => {
          const BrandIcon = brandIcons[link.platform];
          return (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${link.title} (${link.handle})`}
              className="inline-flex size-[34px] items-center justify-center rounded-full border border-border text-foreground no-underline transition-colors duration-150 hover:bg-accent-muted"
            >
              <BrandIcon width={16} height={16} className="block" />
              <span className="sr-only">
                {link.title} — {link.handle}
              </span>
            </a>
          );
        })}
      </div>
    </Panel>
  );
}
