import { activeIndex } from './useDemoNavigation';

export function useActiveDemo() {
  if (activeIndex === 0) {
    shake();
  } else if (activeIndex === 1) {
    location.href = '/ecommerce';
  } else if (activeIndex === 2) {
    location.href = '/spotify-clone';
  } else {
    location.href = '*';
  }
}

function shake() {
  const portfolio = document.querySelector('.portfolio')!;
  portfolio.classList.toggle('invalidShakeAnimation');
  setTimeout(function () {
    portfolio.classList.toggle('invalidShakeAnimation');
  }, 165);
}
