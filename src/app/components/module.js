import yelpFactory from './yelp/factory.js';
import categoryFactory from './main/categoryFactory.js';

angular.module('nearby.main', [])
  .factory('CategoryFactory', categoryFactory)

angular.module('nearby.yelp', [])
  .factory('YelpFactory', yelpFactory)
  .filter('placeholderImage', function(){
    return function(url) {
      if (!url) {
        return '/img/placeholder.png';
      }
      return url;
    }
  })
  .filter('scaleImg', function() {
    return function(url, size) {
      console.log('scaleImg size', size);
      if (!size) { size='l'; }
      //Sizes - s, ms, l, o
      if (url) {
        return url.replace(/\/[s,m,l,o]+(\.jpg)$/g, '/' + size + '$1');
      }
      return url;
    }
  });
