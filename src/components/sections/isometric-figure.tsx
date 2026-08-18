import Image from "next/image";

/**
 * Decorative masthead figure.
 *
 * PLACEHOLDER: the design kit shipped this as a stand-in because no brand mark
 * was supplied. Drop a real image at `public/images/figure-mark.jpeg` (or point
 * `src` elsewhere) — the framing, crop and caption stay as designed.
 */
export function IsometricFigure() {
  return (
    <figure className="relative col-start-2 m-0 min-h-[158px] overflow-hidden p-0">
      <Image
        src="/images/figure-mark.jpeg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="(max-width: 48rem) 100vw, 48rem"
        className="pointer-events-none object-cover object-[center_42%] select-none"
      />
      <figcaption className="absolute right-4 bottom-4 text-sm leading-none tracking-[0.02em] text-white/55 tabular-nums select-none">
        Fig. 1.
      </figcaption>
    </figure>
  );
}
