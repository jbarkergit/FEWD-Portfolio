export const elInViewport = (el: Element, partiallyVisible = false) => {
  const { top, right, bottom, left } = el.getBoundingClientRect(),
    { innerWidth, innerHeight } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
