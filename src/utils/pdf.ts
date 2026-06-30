import type { Orientation, PageSizeOption } from '../types/converter';

export const PAGE_SIZE_POINTS = {
  auto: { width: 612, height: 792 },
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
  legal: { width: 612, height: 1008 },
} satisfies Record<PageSizeOption, { width: number; height: number }>;

export function resolvePageSize(pageSize: PageSizeOption, orientation: Orientation, imageWidth?: number, imageHeight?: number) {
  if (pageSize === 'auto' && imageWidth && imageHeight) {
    const baseWidth = orientation === 'landscape' ? 792 : 612;
    const ratio = imageHeight / imageWidth;
    const width = baseWidth;
    let height = baseWidth * ratio;
    const maxHeight = orientation === 'landscape' ? 612 : 792;

    if (height > maxHeight) {
      height = maxHeight;
      return {
        width: height / ratio,
        height,
      };
    }

    return {
      width,
      height,
    };
  }

  const page = PAGE_SIZE_POINTS[pageSize];

  return orientation === 'portrait' ? page : { width: page.height, height: page.width };
}

export function ptToPx(value: number) {
  return Math.round(value * 1.3333);
}
