(function () {
  const { createReport } = Reports;
  const {
    attachWidget,
    getSearchUrl,
    updateUISuccess,
    updateUIFailure,
    updateActivityList,
  } = ActivityWidget;

  const optionsBlock = document.querySelectorAll('.options div');
  const locationBlock = document.querySelector('#location');
  const forecastButton = document.querySelector('.forecast-button');
  const productImages = document.querySelectorAll('.product-image');

  const reportActivities = createReport();
  const reportProducts = createReport();

  attachWidget(optionsBlock);

  forecastButton.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      const location = locationBlock.value;
      const searchUrl = getSearchUrl(location);

      fetch(searchUrl)
        .then((res) => res.json())
        .then((response) => updateUISuccess(response))
        .catch(() => updateUIFailure());

      locationBlock.value = '';
    },
    false,
  );

  optionsBlock.forEach((el) =>
    el.addEventListener(
      'click',
      (e) => {
        updateActivityList(e);
        reportActivities(e.target.id);
      },
      false,
    ),
  );

  productImages.forEach((el) =>
    el.addEventListener(
      'mouseenter',
      (e) => {
        reportProducts(e.target.nextElementSibling.textContent);
      },
      false,
    ),
  );
})();
