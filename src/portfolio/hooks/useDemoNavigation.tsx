export let activeIndex: number = 0;

export function NavigateLeft() {
  const demos: HTMLCollection = document.getElementsByClassName('demoSection'),
    nextIndex: number = activeIndex - 1 >= 0 ? activeIndex - 1 : demos.length - 1,
    activeDemo: HTMLElement = document.querySelector(`[data-index="${activeIndex}"]`)!,
    nextDemo: HTMLElement = document.querySelector(`[data-index="${nextIndex}"]`)!;

  activeDemo instanceof HTMLElement ? (activeDemo.dataset.status = 'after') : console.log(Error());
  nextDemo instanceof HTMLElement ? (nextDemo.dataset.status = 'active-from-before') : console.log(Error());

  setTimeout(() => {
    nextDemo.dataset.status = 'active';
    activeIndex = nextIndex;
  }, 50);
}

export function NavigateRight() {
  const demos = document.getElementsByClassName('demoSection'),
    nextIndex: number = activeIndex + 1 <= demos.length - 1 ? activeIndex + 1 : 0,
    activeDemo: HTMLElement = document.querySelector(`[data-index="${activeIndex}"]`)!,
    nextDemo: HTMLElement = document.querySelector(`[data-index="${nextIndex}"]`)!;

  activeDemo instanceof HTMLElement ? (activeDemo.dataset.status = 'before') : console.log(Error());
  nextDemo instanceof HTMLElement ? (nextDemo.dataset.status = 'active-from-after') : console.log(Error());

  setTimeout(() => {
    nextDemo.dataset.status = 'active';
    activeIndex = nextIndex;
  }, 50);
}
