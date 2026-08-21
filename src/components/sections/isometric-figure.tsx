import Image from "next/image";

/**
 * Decorative masthead figure.
 *
 * PLACEHOLDER: the design kit shipped this as a stand-in because no brand mark
 * was supplied. Drop a real image at `public/images/banner.png` (or point
 * `src` elsewhere) — the framing and crop stay as designed.
 *
 * The figure is a fixed 158px tall, so below `sm` the `object-cover` scale is
 * pinned by that height rather than the (now narrower) width — which renders
 * the mark about a third smaller than on desktop. `max-sm:scale-150` zooms it
 * back to parity without touching the card's layout; `overflow-hidden` clips
 * the overspill.
 */
export function IsometricFigure() {
  return (
    <figure className="relative col-start-2 m-0 min-h-[158px] overflow-hidden p-0">
      <Image
        src="/images/banner.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="(max-width: 48rem) 100vw, 48rem"
        className="pointer-events-none object-cover object-[center_42%] select-none max-sm:scale-150"
      />
    </figure>
  );
}
