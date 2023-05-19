(function () {
  const url = CONFIG.WEATHER_API.URL;
  const apiKey = CONFIG.WEATHER_API.KEY;
  const $weatherBox = $('#weather');

  const updateUISuccess = (response) => {
    const condition = response.weather[0].main;
    const degC = response.main.temp - 273.15;
    const degCInt = Math.floor(degC);
    const degF = degC * 1.8 + 32;
    const degFInt = Math.floor(degF);

    $weatherBox.append(
      `<p>${degCInt}&#176; C / ${degFInt}&#176; F </p><p>${condition}</p>`,
    );
  };

  const updateUIError = () => {
    $weatherBox.addClass('hidden');
  };

  $.get(`${url}&appid=${apiKey}`)
    .done((res) => updateUISuccess(res))
    .fail(() => updateUIError());
})();
