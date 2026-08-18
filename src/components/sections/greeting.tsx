"use client";

import { useEffect, useState } from "react";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui";
import { profile } from "@/content";
import { getGreeting, type Greeting as GreetingText } from "@/lib/datetime";
import { RichText } from "./shared/rich-text";

/**
 * Time-aware bio panel.
 *
 * The server cannot know the visitor's timezone, so it renders the greeting for
 * the profile's own zone — the same value the client computes on its first
 * pass, which keeps hydration clean. Once mounted we re-derive it from the
 * visitor's actual zone so the greeting is true for whoever is reading.
 */
export function Greeting() {
  const [greeting, setGreeting] = useState<GreetingText>(() =>
    getGreeting(new Date(), profile.timeZone),
  );

  useEffect(() => {
    const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone || profile.timeZone;
    setGreeting(getGreeting(new Date(), visitorZone));
  }, []);

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle className="py-2.5 font-handwritten text-[34px] font-medium">
          {greeting}
        </PanelTitle>
      </PanelHeader>
      <PanelContent className="px-4 pt-4 pb-5">
        <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
          {profile.bio.map((line) => (
            <li key={line} className="flex gap-3 text-base leading-[1.65]">
              <span aria-hidden="true" className="shrink-0 text-bullet">
                •
              </span>
              <span>
                <RichText>{line}</RichText>
              </span>
            </li>
          ))}
        </ul>
      </PanelContent>
    </Panel>
  );
}
