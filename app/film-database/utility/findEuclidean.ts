/** Finds Eudclidean distance within supplied DOMRect[] and returns the index of the closest element */
export const findEuclidean = (detach: Record<'x' | 'y', number>, data: DOMRect[]): number => {
  return data.reduce<{
    rect: DOMRect | null;
    index: number;
    distance: number;
  }>(
    (closest, rect, index) => {
      // Check if the detachment point is within the bounds of the current rect
      const isWithinBounds =
        detach.x >= rect.left && detach.x <= rect.right && detach.y >= rect.top && detach.y <= rect.bottom;

      if (isWithinBounds) return { rect, index, distance: 0 };

      // Find the center of the rect
      const rectCenter: { x: number; y: number } = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      // Calculate Euclidean distance: sqrt((x2-x1)^2 + (y2-y1)^2)
      const distance = Math.sqrt(Math.pow(rectCenter.x - detach.x, 2) + Math.pow(rectCenter.y - detach.y, 2));

      // If the current rect is closer, update closest
      if (distance < closest.distance) return { rect, index, distance };

      // If this rect is farther, keep the previous closest
      return closest;
    },
    { rect: null, index: -1, distance: Infinity }
  ).index;
};
