const prefetchTargetHander = () => {
  const prefetchTarget = document.querySelector('.prefetch_target');
  prefetchTarget.style.backgroundColor = 'yellow';
};

window.addEventListener('DOMContentLoaded', prefetchTargetHander);
