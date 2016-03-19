//var oauthSignature = require('oauth-signature');
var OAuth   = require('oauth-1.0a');
var baseUrl = 'https://api.yelp.com/v2';

export default /*@ngInject*/ function ($q, $http, YELP) {

  var oauth = OAuth({
    consumer: YELP.consumer,
    signature_method: 'HMAC-SHA1'
  });

  return {
    nearby: _nearby
  };

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
