"use client";

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";

const svgUri = (inner: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">${inner}</svg>`
  )}`;

const BEFORE_SRC = svgUri(
  `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#14161a"/><stop offset="1" stop-color="#26292f"/>` +
    `</linearGradient></defs>` +
    `<rect width="800" height="600" fill="url(#g)"/>` +
    `<text x="400" y="315" font-family="Arial, sans-serif" font-size="44" letter-spacing="10" fill="#5d6068" text-anchor="middle">BEFORE</text>`
);

const AFTER_SRC = svgUri(
  `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#3a3125"/><stop offset="1" stop-color="#9a8b72"/>` +
    `</linearGradient></defs>` +
    `<rect width="800" height="600" fill="url(#g)"/>` +
    `<text x="400" y="315" font-family="Arial, sans-serif" font-size="44" letter-spacing="10" fill="#12130f" text-anchor="middle">AFTER</text>`
);

export function HeroProof() {
  return (
    <div className="mx-auto mt-14 w-full max-w-md">
      <p className="label mb-3 text-center">Drag to reveal</p>

      <ImageComparison className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-hairline-mid shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <ImageComparisonImage
          src={BEFORE_SRC}
          alt="Client before training"
          position="right"
        />
        <ImageComparisonImage
          src={AFTER_SRC}
          alt="Client after sixteen weeks of training"
          position="left"
        />

        <ImageComparisonSlider className="w-px bg-bronze">
          <span className="absolute left-1/2 top-1/2 flex h-10 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[3px] border border-bronze bg-obsidian-soft text-[0.65rem] tracking-[0.15em] text-bronze-bright shadow-lg">
            ‹›
          </span>
        </ImageComparisonSlider>

        <span className="absolute left-3 top-3 rounded-full border border-hairline-strong bg-obsidian-scrim px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.25em] text-parchment-dim backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-bronze-rule bg-obsidian-scrim px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.25em] text-bronze-bright backdrop-blur-sm">
          After
        </span>
      </ImageComparison>

      <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.25em] text-parchment-dim">
        Real client · 16 weeks
      </p>
    </div>
  );
}

export default HeroProof;
