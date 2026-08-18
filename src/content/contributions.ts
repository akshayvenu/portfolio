import { siteConfig } from "./site";

/** GitHub account the contribution mosaic is fetched for. */
export const contributionUser = "akshayvenu";

/** Static bits of the figure caption; the date range comes from the API. */
export const contributionSource = {
  sourceLabel: "GitHub",
  sourceHref: siteConfig.githubUrl,
} as const;
