import AppCtrl from './components/main/mainController.js';
import SearchCtrl from './components/search/searchController.js';
import BusinessCtrl from './components/business/businessController.js';

export default /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
    console.log('setting up routes');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: require('./components/main/template.html'),
        controller: AppCtrl,
        controllerAs: 'app'
      })
      .state('search', {
        url: '/search/{category}?page',
        template: require('./components/search/template.html'),
        controller: SearchCtrl,
        controllerAs: 'search',
        sticky: true,
      })
      .state('search.business', {
        url: '^/business/:id',
        template: require('./components/business/template.html'),
        controller: BusinessCtrl,
        controllerAs: 'business'
      });
  }
