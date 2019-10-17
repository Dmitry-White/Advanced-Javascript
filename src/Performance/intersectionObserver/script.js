const observerConfig = {
  threshold: [0, 0.5, 1],
};

const observerHandler = (entries) => {
  const isLessThanHalfVisible = entries[0].intersectionRatio < 0.5;
  const isHalfAndMoreVisible = entries[0].intersectionRatio >= 0.5
    && entries[0].intersectionRatio < 1;
  const isFullyVisible = entries[0].intersectionRatio >= 1;

  if (isLessThanHalfVisible) {
    entries[0].target.className = 'background0';
  }

  if (isHalfAndMoreVisible) {
    entries[0].target.className = 'background50';
  }

  if (isFullyVisible) {
    entries[0].target.className = 'background100';
  }
};

const observerLoader = () => {
  const targetElem = document.querySelector('#targetElem');

  const observer = new IntersectionObserver(observerHandler, observerConfig);
  observer.observe(targetElem);
};

window.addEventListener('load', observerLoader);
