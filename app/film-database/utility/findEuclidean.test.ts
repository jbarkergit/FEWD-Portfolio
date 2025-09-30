import { expect, it } from 'vitest';
import { findEuclidean } from '~/film-database/utility/findEuclidean';

it('findEuclidean returns the index of the closest element', () => {
  const rects: DOMRect[] = [
    { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 } as DOMRect,
    { left: 200, top: 200, right: 250, bottom: 250, width: 50, height: 50 } as DOMRect,
  ];

  const result = findEuclidean({ x: 50, y: 50 }, rects);

  expect(result).toBe(0);
});
