import { SVGProps } from 'react';

export function MaterialSymbolsPlayArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='M8 19V5l11 7z'></path>
    </svg>
  );
}

export function MaterialSymbolsPause(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='M14 19V5h4v14zm-8 0V5h4v14z'></path>
    </svg>
  );
}

export function MaterialSymbolsVolumeUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M14 20.725v-2.05q2.25-.65 3.625-2.5t1.375-4.2t-1.375-4.2T14 5.275v-2.05q3.1.7 5.05 3.138T21 11.975t-1.95 5.613T14 20.725M3 15V9h4l5-5v16l-5-5zm11 1V7.95q1.175.55 1.838 1.65T16.5 12q0 1.275-.663 2.363T14 16'></path>
    </svg>
  );
}

export function MaterialSymbolsVolumeDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='M5 15V9h4l5-5v16l-5-5zm11 1V7.95q1.125.525 1.813 1.625T18.5 12t-.687 2.4T16 16'></path>
    </svg>
  );
}

export function MaterialSymbolsVolumeOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='m19.8 22.6l-3.025-3.025q-.625.4-1.325.688t-1.45.462v-2.05q.35-.125.688-.25t.637-.3L12 14.8V20l-5-5H3V9h3.2L1.4 4.2l1.4-1.4l18.4 18.4zm-.2-5.8l-1.45-1.45q.425-.775.638-1.625t.212-1.75q0-2.35-1.375-4.2T14 5.275v-2.05q3.1.7 5.05 3.138T21 11.975q0 1.325-.363 2.55T19.6 16.8m-3.35-3.35L14 11.2V7.95q1.175.55 1.838 1.65T16.5 12q0 .375-.062.738t-.188.712M12 9.2L9.4 6.6L12 4z'></path>
    </svg>
  );
}

export function SvgSpinnersRingResize(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <g stroke='currentColor'>
        <circle cx='12' cy='12' r='9.5' fill='none' strokeLinecap='round' strokeWidth='3'>
          <animate
            attributeName='stroke-dasharray'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
            keyTimes='0;0.475;0.95;1'
            repeatCount='indefinite'
            values='0 150;42 150;42 150;42 150'></animate>
          <animate
            attributeName='stroke-dashoffset'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
            keyTimes='0;0.475;0.95;1'
            repeatCount='indefinite'
            values='0;-16;-59;-59'></animate>
        </circle>
        <animateTransform attributeName='transform' dur='2s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'></animateTransform>
      </g>
    </svg>
  );
}
