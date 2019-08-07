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

	const activities = {
		teamIn: ['basketball','hockey','volleyball'],
		teamOutWarm: ['softball/baseball','football/soccer','American football','rowing','tennis','volleyball','ultimate frisbee','rugby'],
		teamOutCold: ['hockey'],
		soloIn: ['rock climbing','swimming','ice skating'],
		soloOutWarm: ['rowing','running','hiking','cycling','rock climbing'],
		soloOutCold: ['snowshoeing','downhill skiing','cross-country skiing','ice skating']
	}
	let state = {};
	let category = 'all';

	function getSearchUrl(location) {
		const cityQuery = `${apiCityParameter}${location}`;
		const searchUrl = `${apiUrl}${apiDataCollection}?${cityQuery}&${apiAuthorization}`;
		return searchUrl;
	}

	function getIconUrl(icon) {
		const iconUrl = `${env.SERVICE_URL}${serviceImgCollection}${icon}.png`;
		return iconUrl;
	}

	// get weather data when user clicks Forecast button, then add temp & conditions to view
	$('.forecast-button').click(function(e) {
		e.preventDefault();
		const location = $('#location').val();
		const searchUrl = getSearchUrl(location);

		$.get(searchUrl).done(function(response) {
			updateUISuccess(response);
		}).fail(function() {
			updateUIFailure();
		});

		$('#location').val('');
	});

	// update list of sports when user selects a different category (solo/team/all)
	$('.options div').on('click', updateActivityList);

	// handle ajax success
	function updateUISuccess(response) {
		const { main: { temp }, weather, name } = response;
		const { main, icon } = weather[0];

		const degC = temp - 273.15;
		const degCInt = Math.floor(degC);
		const degF = degC * 1.8 + 32;
		const degFInt = Math.floor(degF);

		state = {
			condition: main,
			icon: getIconUrl(icon),
			degCInt: Math.floor(degCInt),
			degFInt: Math.floor(degFInt),
			city: name,
		};

		const $into = $('.conditions')[0];

		ReactDOM.render(<Forecast {...state} />, $into);

		function Forecast(props) {
			const { city, degCInt, degFInt, icon, condition } = props;
			return (
				<div>
					<p className="city">{city}</p>
					<p>{degCInt}&#176; C / {degFInt}&#176; F <img src={icon} alt={condition} /></p>
				</div>
			)
		}

		updateActivityList();
	}

	// handle selection of a new category (team/solo/all) 
	function updateActivityList(event) {
		const { condition, degFInt } = state;
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
			category = $(this).attr('id');
			$('.options div').removeClass('selected');
			$(this).addClass('selected');
		} 

		if (condition === "Rain") {
			updateState('In');
		} else if (condition === "Snow" || degFInt < 50) {
			updateState('OutCold');
		} else {
			updateState('OutWarm');
		}

		function updateState(type) {
			if (category === "solo") {
				state.activities.push(...activities['solo' + type]);
			} else if (category === "team") {
				state.activities.push(...activities['team' + type]);
			} else {
				state.activities.push(...activities['solo' + type]);
				state.activities.push(...activities['team' + type]);
			}
		}

		const $into = $('.activities')[0];

		ReactDOM.render(<Activities {...state} />, $into);

		function Activities(props) {
			const { activities } = props;

			const activitiesList = activities.map(function(activity, index) {
				return <li key={index}>{activity}</li>
			});
			return (
				<div>
					<ul>{activitiesList}</ul>
				</div>
			)
		}

		$('.results').slideDown(300);
	}

	// handle ajax failure
	function updateUIFailure() {
		$(".conditions").text(apiErrorMessage);
	}
})();