//var oauthSignature = require('oauth-signature');
var OAuth   = require('oauth-1.0a');
var haversine = require('haversine');
var baseUrl = 'https://api.yelp.com/v2';

export default /*@ngInject*/ function ($q, $http, YELP) {

  var oauth = OAuth({
    consumer: YELP.consumer,
    signature_method: 'HMAC-SHA1'
  });

  var _metaCache = {};

  return {
    nearby: _nearby,
    details: _details,
    metaCache: metaCache,
    distance: _distance
  };

  function _distance(destinationCoords, unit) {

    return getPosition().then(function(coords) {
      var start = {
        latitude: coords.lat,
        longitude: coords.lng
      }

      var end = destinationCoords;
      return haversine(start, end, {unit: 'mile'});
    })


  }

  function metaCache(properties) {
    if (properties) {
      _metaCache = properties;
    }
    return _metaCache
  }

  function _details(id) {
    var request_data = {
      url: baseUrl + '/business/' + id,
      method: 'GET',
      data: {}
    };
    var signed = signRequest(request_data)

    return $http({
      url: request_data.url,
      method: request_data.method,
      params: _.assign(signed.data,signed.param)
    })
  }

  function _nearby(category, perPage, pageOffset) {

    if(!perPage){perPage = 3;}
    if(!pageOffset){pageOffset = 0}

    var offset = pageOffset * perPage;

    return getPosition().then(function(pos){
      return {
        'category_filter': category,
        'll': _.join([pos.lat, pos.lng],','),
        'sort': 1,
        'limit': perPage,
        'offset': offset
      }

    })
    .then(function(params) {

      var request_data = {
        url: baseUrl + '/search',
        method: 'GET',
        data: params
      };
      var signed = signRequest(request_data)

      return $http({
        url: request_data.url,
        method: request_data.method,
        params: _.assign(signed.data,signed.param)
      });

    })
  }

  function getPosition() {
    return $q.resolve({
      lat: 42.347231799999996,
      lng: -83.07475989999999
    })
  }

  function signRequest(request_data) {
    /* We can setup default parameters here */
    var default_parameters = {
      radius_filter: milesToMeters(5),
    };

    request_data.data = _.assign(default_parameters, request_data.data);

    return {
      data: request_data.data,
      param: oauth.authorize(request_data, YELP.token)
    }
  };

  function milesToMeters(miles){
    return miles * 1609; //miles * meters/mile
  }

}
