import { siteConfig } from "@/content";
import { ContentColumn } from "./content-column";
import { HashedBand } from "./hashed-band";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <HashedBand />
      <ContentColumn className="flex flex-wrap justify-between gap-4 border-x border-line px-4 py-5 font-mono text-sm text-muted-foreground">
        <span>
          © {year} {siteConfig.name}
        </span>
        <span>Built with care</span>
      </ContentColumn>
      <div className="border-t border-line" />
    </footer>
  );
}
