(function () {
  const url = CONFIG.WEATHER_API.URL;
  const apiKey = CONFIG.WEATHER_API.KEY;
  const $weatherBox = $('#weather');

  const updateUISuccess = (response) => {
    const degC = response.main.temp - 273.15;
    const degF = degC * 1.8 + 32;

    const state = {
      condition: response.weather[0].main,
      degCInt: Math.floor(degC),
      degFInt: Math.floor(degF),
    };

    const into = document.querySelector('#weather');
    ReactDOM.render(<Forecast {...state} />, into);

    function Forecast(props) {
      return (
        <div>
          <p>
            {props.degCInt}&#176; C / {props.degFInt}&#176; F
          </p>
          <p>{props.condition}</p>
        </div>
      );
    }
  };

  const updateUIError = () => {
    $weatherBox.addClass('hidden');
  };

  $.get(url + '&appid=' + apiKey)
    .done((res) => updateUISuccess(res))
    .fail(() => updateUIError());
})();
