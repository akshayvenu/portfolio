import type { Metadata } from "next";
import { ContentColumn, HashedBand, SiteFooter, SiteHeader } from "@/components/layout";
import {
  Consistency,
  CurrentProgram,
  MuscleSplit,
  PersonalRecords,
  RecentSessions,
  TrainingHeader,
  TrainingStats,
} from "@/components/sections/fitness";
import { getTrainingSnapshot } from "@/lib/hevy/snapshot";

export const metadata: Metadata = {
  title: "Side Quest",
  description:
    "Training log pulled live from the Hevy API — sessions, volume, consistency and personal bests.",
  alternates: { canonical: "/side-quest" },
};

/** The Hevy client already sets an hour of ISR; this keeps the page in step. */
export const revalidate = 3600;

export default async function SideQuestPage() {
  const snapshot = await getTrainingSnapshot();

  return (
    <>
      <SiteHeader />

      <main>
        <ContentColumn>
          <TrainingHeader snapshot={snapshot} />
          <TrainingStats stats={snapshot.stats} />
        </ContentColumn>

        <HashedBand />

        <ContentColumn>
          <Consistency days={snapshot.heatmap} />

          {/* Two half-width panels that stack below `sm`; the shared middle rule
              comes from the left panel's own border, so the seam stays hairline. */}
          <div className="flex flex-col sm:flex-row">
            <MuscleSplit split={snapshot.muscleSplit} />
            <PersonalRecords records={snapshot.records} />
          </div>
        </ContentColumn>

        <HashedBand />

        <ContentColumn>
          <RecentSessions workouts={snapshot.workouts} />
          <CurrentProgram routines={snapshot.routines} />
        </ContentColumn>
      </main>

      <SiteFooter />
    </>
  );
}
