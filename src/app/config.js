import AppCtrl from './components/main/mainController.js';

export default /*@ngInject*/ function($routeProvider) {
    console.log('setting up routes');

    $routeProvider.
      when('/', {
        template: require('./components/main/template.html'),
        controller: AppCtrl,
        controllerAs: 'app'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
