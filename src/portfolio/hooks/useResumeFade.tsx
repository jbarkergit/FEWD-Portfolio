export function useResumeFade() {
  const resume: HTMLElement = document.getElementById('resume')!;
  const resumeBlocks = document.querySelectorAll('.resume__block')!;
  const resumeNavigationButtons = document.querySelectorAll('.resume__navigation--button')!;

  if (resume instanceof HTMLElement) {
    resume.classList.contains('fadeIn') ? resume.classList.toggle('fadeOut') : resume.classList.toggle('fadeIn');
  } else {
    throw new Error();
  }
  for (const block of resumeBlocks) {
    block.classList.contains('fadeIn') ? block.classList.toggle('fadeOut') : block.classList.toggle('fadeIn');
  }
  for (const button of resumeNavigationButtons) {
    button.classList.contains('fadeIn') ? button.classList.toggle('fadeOut') : button.classList.toggle('fadeIn');
  }
}
