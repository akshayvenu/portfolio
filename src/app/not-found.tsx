import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[var(--content-max-width)] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="m-0 font-mono text-sm text-muted-foreground">404</p>
      <h1 className="m-0 text-3xl font-medium tracking-[-0.01em]">This page doesn&rsquo;t exist</h1>
      <p className="m-0 text-base text-muted-foreground">
        The link may be out of date, or the page may have moved.
      </p>
      <Link href="/" className="link-underline mt-2 text-base text-foreground">
        Back to the portfolio
      </Link>
    </main>
  );
}
