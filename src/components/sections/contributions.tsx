import { Panel, PanelSrTitle } from "@/components/ui";
import { contributionSource, contributionUser } from "@/content";
import { emptyCalendar, fetchContributions } from "@/lib/contributions";
import { ContributionsMosaic } from "./contributions-mosaic";

/**
 * Server component: pulls the real GitHub contribution calendar (revalidated
 * hourly) and hands it to the interactive mosaic.
 */
export async function Contributions() {
  const calendar = (await fetchContributions(contributionUser)) ?? emptyCalendar();

  return (
    <Panel noTopLine>
      <PanelSrTitle>Contributions</PanelSrTitle>
      <ContributionsMosaic
        calendar={calendar}
        sourceLabel={contributionSource.sourceLabel}
        sourceHref={contributionSource.sourceHref}
      />
    </Panel>
  );
}
