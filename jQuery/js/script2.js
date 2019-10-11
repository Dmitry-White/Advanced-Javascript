(function() {
	const url = CONFIG.WEATHER_API.URL;
	const apiKey = CONFIG.WEATHER_API.KEY;

	$.get(url + '&appid=' + apiKey)
		.done(res => console.log(res));
})();
/*
(function() {
	const url = CONFIG.WEATHER_API.URL;
	const apiKey = CONFIG.WEATHER_API.KEY;
	const httpRequest = new XMLHttpRequest();
	const weatherBox = document.getElementById('weather');

	const updateUISuccess = (responseText) => {
		const response = JSON.parse(responseText);
		const condition = response.weather[0].main;
		const degC = response.main.temp - 273.15;
		const degCInt = Math.floor(degC);
		const degF = degC * 1.8 + 32;
		const degFInt = Math.floor(degF);

		weatherBox.innerHTML = '<p>' + degCInt + '&#176; C / ' + degFInt + '&#176; F </p><p>' + condition + '</p>';
	};

	const updateUIError = () => {
		weatherBox.className = 'hidden';
	}
	
	const responseMethod = () => {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				updateUISuccess(httpRequest.responseText);
			} else {
				updateUIError()
			}
			console.log(httpRequest.responseText);
		}
	};

	const makeRequest = () => {
		httpRequest.onreadystatechange = responseMethod;
		httpRequest.open('GET', url + '&appid=' + apiKey);
		httpRequest.send();
	};

	makeRequest();
})();
*/