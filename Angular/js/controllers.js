angular.module('listApp', [])
  .controller('ListController', ['$http', ($http) => {
    const url = CONFIG.EVENTBRITE_API.URL;
    const apiKey = CONFIG.EVENTBRITE_API.KEY;
    $http.get(url + '&token=' + apiKey)
      .then(data => console.log(data));
  }])