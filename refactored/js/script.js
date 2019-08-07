"use strict";

(function() {
	const apiUrl = env.API_URL;
	const apiKey = env.API_KEY;
	const apiErrorMessage = "Weather information unavailable";
	const apiAuthParameter = 'appid=';
	const apiCityParameter = 'q=';
	const apiDataCollection = 'weather';
	const apiAuthorization = `${apiAuthParameter}${apiKey}`;
	const serviceImgCollection = 'img/w/';

	const ACTIVITIES = {
		teamIn: ['basketball','hockey','volleyball'],
		teamOutWarm: ['softball/baseball','football/soccer','American football','rowing','tennis','volleyball','ultimate frisbee','rugby'],
		teamOutCold: ['hockey'],
		soloIn: ['rock climbing','swimming','ice skating'],
		soloOutWarm: ['rowing','running','hiking','cycling','rock climbing'],
		soloOutCold: ['snowshoeing','downhill skiing','cross-country skiing','ice skating']
	}
	const CONDITIONS = {
		RAIN: 'Rain',
		SNOW: 'Snow',
	};
	const PLACE_TYPES = {
		INSIDE: 'In',
		OUTSIDE: {
			COLD: 'OutCold',
			WARM: 'OutWarm'
		}
	};
	const CATEGORIES = {
		ALL: 'all',
		SOLO: 'solo',
		TEAM: 'team',
	};

	const SLIDE_SPEED = 300;

	let state = {};
	let currentCategory = CATEGORIES.ALL;

	function getSearchUrl(location) {
		const cityQuery = `${apiCityParameter}${location}`;
		const searchUrl = `${apiUrl}${apiDataCollection}?${cityQuery}&${apiAuthorization}`;
		return searchUrl;
	}

	function getIconUrl(icon) {
		const iconUrl = `${env.SERVICE_URL}${serviceImgCollection}${icon}.png`;
		return iconUrl;
	}

	function getCelcius(tempKelvin) {
		return tempKelvin - 273.15;
	}

	function getFahrenheit(tempKelvin) {
		return getCelcius(tempKelvin) * 1.8 + 32;
	}

	// get weather data when user clicks Forecast button, then add temp & CONDITIONS to view
	$('.forecast-button').click(e => {
		e.preventDefault();
		const location = $('#location').val();
		const searchUrl = getSearchUrl(location);

		fetch(searchUrl)
			.then(res => res.json())
			.then(response => updateUISuccess(response))
			.catch(() => updateUIFailure());

		$('#location').val('');
	});

	// update list of sports when user selects a different currentCategory (solo/team/all)
	$('.options div').on('click', updateActivityList);

	// handle ajax success
	function updateUISuccess(response) {
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

		const $into = $('.conditions')[0];

		ReactDOM.render(<Forecast {...state} />, $into);

		function Forecast(props) {
			const { city, celcius, fahrenheit, icon, condition } = props;
			return (
				<div>
					<p className="city">{city}</p>
					<p>{celcius}&#176; C / {fahrenheit}&#176; F <img src={icon} alt={condition} /></p>
				</div>
			)
		}

		updateActivityList();
	}

	// handle selection of a new currentCategory (team/solo/all) 
	function updateActivityList(event) {
		const { condition, fahrenheit } = state;
		state.activities = [];

		if (event !== undefined && $(this).hasClass('selected')) {
			// if the 'event' parameter is defined, then a tab has been clicked; if not, then this is the
			//   default case and the view simply needs to be updated
			// if the clicked tab has the class 'selected', then no need to change location of 'selected' class
			//   or change the DOM
			return true;
		} else if (event !== undefined && !$(this).hasClass('selected')) {
			// if the 'event' parameter is defined, then a tab has been clicked
			// if the clicked tab does not have the class 'selected', then location of 'selected' class must be added
			//   to the clicked element and removed from its siblings
			currentCategory = $(this).attr('id');
			$('.options div').removeClass('selected');
			$(this).addClass('selected');
		} 

		if (condition === CONDITIONS.RAIN) {
			updateState(PLACE_TYPES.INSIDE);
		} else if (condition === CONDITIONS.SNOW || fahrenheit < 50) {
			updateState(PLACE_TYPES.OUTSIDE.COLD);
		} else {
			updateState(PLACE_TYPES.OUTSIDE.WARM);
		}

		function updateState(type) {
			if (currentCategory === CATEGORIES.SOLO) {
				state.activities.push(...ACTIVITIES[CATEGORIES.SOLO + type]);
			} else if (currentCategory === CATEGORIES.TEAM) {
				state.activities.push(...ACTIVITIES[CATEGORIES.TEAM + type]);
			} else {
				state.activities.push(...ACTIVITIES[CATEGORIES.SOLO + type]);
				state.activities.push(...ACTIVITIES[CATEGORIES.TEAM + type]);
			}
		}

		const $into = $('.activities')[0];

		ReactDOM.render(<Activities {...state} />, $into);

		function Activities(props) {
			const { activities } = props;

			const activitiesList = activities.map((activity, index) => {
				return <li key={index}>{activity}</li>
			});
			return (
				<div>
					<ul>{activitiesList}</ul>
				</div>
			)
		}

		$('.results').slideDown(SLIDE_SPEED);
	}

	// handle ajax failure
	function updateUIFailure() {
		$(".conditions").text(apiErrorMessage);
	}
})();