import config from './config';

require('./vendor');
require('./components/module');

//styles
require('../style/app.css');

// directives
require('./directives/module');

angular.module('nearby', [
    'ngRoute',
    'nearby.yelp',
    'nearby.main',
    'nearby.directives'
  ])
  /*
    WARNING! _____________
    THIS DATA WILL BE VISIBLE IN YOUR SOURCE CODE IF YOU PUT THIS ON THE WEB!
    YOU DON'T WANT THAT!
  */
  .constant('YELP_KEY', process.env.CONSUMER_KEY)
  .constant('YELP_SECRET', process.env.CONSUMER_KEY)
  .constant('TOKEN', process.env.TOKEN)
  .constant('SECRET', process.env.SECRET)
  .config(config)
  .run(function($route) {
    $route.reload();
    console.log('running...', $route)
  })
