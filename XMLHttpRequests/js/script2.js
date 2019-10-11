(function() {
	const url = CONFIG.WEATHER_API.URL;
	const apiKey = CONFIG.WEATHER_API.KEY;
	const httpRequest = new XMLHttpRequest();;
	
	const responseMethod = () => {
		if (httpRequest.readyState === 4) {
			console.log(httpRequest.responseText)
		}
	};

	const makeRequest = () => {
		httpRequest.onreadystatechange = responseMethod;
		httpRequest.open('GET', url + '&appid=' + apiKey);
		httpRequest.send();
	};

	makeRequest();
})();