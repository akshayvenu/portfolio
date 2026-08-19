import { ContentColumn, HashedBand, SiteFooter, SiteHeader } from "@/components/layout";
import {
  // Certifications,
  // Contributions,
  Education,
  Experience,
  Greeting,
  Overview,
  ProfileHeader,
  // Projects,
  SocialLinks,
  Stack,
} from "@/components/sections";
import { siteConfig } from "@/content";
import { profile } from "@/content/profile";
import { socialLinks } from "@/content/social";

/**
 * Structured data so search engines read the page as a person, not just prose.
 */
function PersonJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from our own typed content — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <SiteHeader />

      <main>
        <ContentColumn>
          <ProfileHeader />
        </ContentColumn>

        <HashedBand />

        <ContentColumn>
          <Overview />
          <SocialLinks />
          {/* <Contributions /> */}
        </ContentColumn>

        <HashedBand />

        <ContentColumn>
          <Greeting />
          <Stack />
          <Experience />
          <Education />
          {/* <Projects /> */}
          {/* <Certifications /> */}
        </ContentColumn>
      </main>

      <SiteFooter />
    </>
  );
}
