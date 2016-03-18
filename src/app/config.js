import AppCtrl from './components/main/mainController.js';
import SearchCtrl from './components/search/searchController.js';

export default /*@ngInject*/ function($routeProvider) {
    console.log('setting up routes');

    $routeProvider.
      when('/', {
        template: require('./components/main/template.html'),
        controller: AppCtrl,
        controllerAs: 'app'
      }).
      when('/search/:category', {
        template: require('./components/search/template.html'),
        controller: SearchCtrl,
        controllerAs: 'search'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
