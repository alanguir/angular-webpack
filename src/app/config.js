import AppCtrl from './components/main/mainController.js';
import SearchCtrl from './components/search/searchController.js';
import BusinessCtrl from './components/business/businessController.js';

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
      when('/business/:id', {
        template: require('./components/business/template.html'),
        controller: BusinessCtrl,
        controllerAs: 'business'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
