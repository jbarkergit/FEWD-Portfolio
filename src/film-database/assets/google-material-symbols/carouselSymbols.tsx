import { SVGProps } from 'react';

export function MaterialSymbolsChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'></path>
    </svg>
  );
}

export function MaterialSymbolsChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'></path>
    </svg>
  );
}
