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
  .constant('CONSUMER_KEY', process.env.CONSUMER_KEY)
  .constant('CONSUMER_SECRET', process.env.CONSUMER_SECRET)
  .constant('TOKEN', process.env.TOKEN)
  .constant('TOKEN_SECRET', process.env.TOKEN_SECRET)
  .constant('YELP', {
    consumer: {
      public: process.env.CONSUMER_KEY,
      secret: process.env.CONSUMER_SECRET
    },
    token: {
      public: process.env.TOKEN,
      secret: process.env.TOKEN_SECRET
    }
  })
  .config(config)
  .run(function($route) {
    $route.reload();
    console.log('running...', $route)
  })
