
(function () {
  const apiUrl = env.API_URL;
  const apiKey = env.API_KEY;
  const apiErrorMessage = 'Weather information unavailable';
  const apiAuthParameter = 'appid=';
  const apiCityParameter = 'q=';
  const apiDataCollection = 'weather';
  const apiAuthorization = `${apiAuthParameter}${apiKey}`;
  const serviceImgCollection = 'img/w/';

  const ACTIVITIES = {
    teamIn: ['basketball', 'hockey', 'volleyball'],
    teamOutWarm: ['softball/baseball', 'football/soccer', 'American football', 'rowing', 'tennis', 'volleyball', 'ultimate frisbee', 'rugby'],
    teamOutCold: ['hockey'],
    soloIn: ['rock climbing', 'swimming', 'ice skating'],
    soloOutWarm: ['rowing', 'running', 'hiking', 'cycling', 'rock climbing'],
    soloOutCold: ['snowshoeing', 'downhill skiing', 'cross-country skiing', 'ice skating'],
  };
  const CONDITIONS = {
    RAIN: 'Rain',
    SNOW: 'Snow',
  };
  const PLACE_TYPES = {
    INSIDE: 'In',
    OUTSIDE: {
      COLD: 'OutCold',
      WARM: 'OutWarm',
    },
  };
  const CATEGORIES = {
    ALL: 'all',
    SOLO: 'solo',
    TEAM: 'team',
  };

  let state = {};
  let currentCategory = CATEGORIES.ALL;

  const optionsBlock = document.querySelectorAll('.options div');
  const activitiesBlock = document.querySelector('.activities');
  const conditionsBlock = document.querySelector('.conditions');
  const locationBlock = document.querySelector('#location');
  const forecastButton = document.querySelector('.forecast-button');
  const resultsBlock = document.querySelector('.results');

  const getSearchUrl = (location) => {
    const cityQuery = `${apiCityParameter}${location}`;
    const searchUrl = `${apiUrl}${apiDataCollection}?${cityQuery}&${apiAuthorization}`;
    return searchUrl;
  };

  const getIconUrl = (icon) => `${env.SERVICE_URL}${serviceImgCollection}${icon}.png`;

  const getCelcius = (tempKelvin) => tempKelvin - 273.15;

  const getFahrenheit = (tempKelvin) => getCelcius(tempKelvin) * 1.8 + 32;

  const drawForecast = () => {
    const {
      city, celcius, fahrenheit, icon, condition,
    } = state;

    const container = document.createElement('div');
    const cityParagraph = document.createElement('p');
    const conditionsParagraph = document.createElement('p');
    const iconImage = document.createElement('img');

    cityParagraph.setAttribute('class', 'city');
    cityParagraph.textContent = city;

    conditionsParagraph.textContent = `${celcius}\u00B0 C / ${fahrenheit}\u00B0 F`;

    iconImage.setAttribute('src', icon);
    iconImage.setAttribute('alt', condition);

    conditionsParagraph.appendChild(iconImage);
    container.appendChild(cityParagraph);
    container.appendChild(conditionsParagraph);

    const conditionsContent = document.querySelector('.conditions div');
    if (conditionsContent) {
      conditionsBlock.replaceChild(container, conditionsContent);
    } else {
      conditionsBlock.appendChild(container);
    }
  };

  const drawActivities = () => {
    const { activities } = state;

    const container = document.createElement('div');
    const list = document.createElement('ul');
    activities.forEach((activity, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('key', index);
      listItem.textContent = activity;
      list.appendChild(listItem);
    });

    container.appendChild(list);

    const activitiesContent = document.querySelector('.activities div');
    if (activitiesContent) {
      activitiesBlock.replaceChild(container, activitiesContent);
    } else {
      activitiesBlock.appendChild(container);
    }
  };

  const updateState = (type) => {
    if (currentCategory === CATEGORIES.SOLO) {
      state.activities.push(...ACTIVITIES[CATEGORIES.SOLO + type]);
    } else if (currentCategory === CATEGORIES.TEAM) {
      state.activities.push(...ACTIVITIES[CATEGORIES.TEAM + type]);
    } else {
      state.activities.push(...ACTIVITIES[CATEGORIES.SOLO + type]);
      state.activities.push(...ACTIVITIES[CATEGORIES.TEAM + type]);
    }
  };

  const updateActivityList = (event) => {
    const { condition, fahrenheit } = state;

    state.activities = [];

    if (event !== undefined && event.target.classList.contains('selected')) {
      return true;
    } if (event !== undefined && !event.target.classList.contains('selected')) {
      currentCategory = event.target.id;

      optionsBlock.forEach((tab) => tab.classList.remove('selected'));

      event.target.classList.add('selected');
    }

    if (condition === CONDITIONS.RAIN) {
      updateState(PLACE_TYPES.INSIDE);
    } else if (condition === CONDITIONS.SNOW || fahrenheit < 50) {
      updateState(PLACE_TYPES.OUTSIDE.COLD);
    } else {
      updateState(PLACE_TYPES.OUTSIDE.WARM);
    }

    drawActivities();

    resultsBlock.classList.add('open');
  };

  const updateUISuccess = (response) => {
    const { main: { temp }, weather, name } = response;
    const { main, icon } = weather[0];

    const tempCelcius = getCelcius(temp);
    const tempFahrenheit = getFahrenheit(temp);

    state = {
      condition: main,
      icon: getIconUrl(icon),
      celcius: Math.floor(tempCelcius),
      fahrenheit: Math.floor(tempFahrenheit),
      city: name,
    };

    drawForecast();
    updateActivityList();
  };

  const updateUIFailure = () => conditionsBlock.textContent = apiErrorMessage;

  forecastButton.addEventListener('click', (e) => {
    e.preventDefault();
    const location = locationBlock.value;
    const searchUrl = getSearchUrl(location);

    fetch(searchUrl)
      .then((res) => res.json())
      .then((response) => updateUISuccess(response))
      .catch(() => updateUIFailure());

    locationBlock.value = '';
  }, false);

  optionsBlock.forEach((el) => el.addEventListener('click', (e) => {
    updateActivityList(e);
  }, false));
}());
