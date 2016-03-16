import yelpFactory from './yelp/factory.js';
import categoryFactory from './main/categoryFactory.js';

angular.module('nearby.yelp', [])
  .factory('YelpFactory', yelpFactory);

angular.module('nearby.main', [])
  .factory('CategoryFactory', categoryFactory)
