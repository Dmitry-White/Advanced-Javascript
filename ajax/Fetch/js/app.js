(function () {
  const url = CONFIG.WEATHER_API.URL;
  const apiKey = CONFIG.WEATHER_API.KEY;
  const weatherBox = document.getElementById('weather');

  const updateUISuccess = (response) => {
    const condition = response.weather[0].main;
    const degC = response.main.temp - 273.15;
    const degCInt = Math.floor(degC);
    const degF = degC * 1.8 + 32;
    const degFInt = Math.floor(degF);

    weatherBox.innerHTML = `<p>${degCInt}&#176; C / ${degFInt}&#176; F </p><p>${condition}</p>`;
  };

  const updateUIError = () => {
    weatherBox.className = 'hidden';
  };

  fetch(`${url}&appid=${apiKey}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }

      return res.json();
    })
    .then((res) => updateUISuccess(res))
    .catch((err) => {
      updateUIError();
      console.log(err);
    });
})();
