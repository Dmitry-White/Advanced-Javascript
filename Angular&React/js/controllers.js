angular.module('listApp', [])
  .controller('ListController', ['$http', ($http) => {
    const url = CONFIG.EVENTBRITE_API.URL;
    const apiKey = CONFIG.EVENTBRITE_API.KEY;
    const vm = this;
    vm.events = [];
    vm.showError = false;
    $http.get(url + '&token=' + apiKey)
      .success(data => {
        vm.events = data.events;
      })
      .error(() => {
        vm.showError = true;
      });
  }])