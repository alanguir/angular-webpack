var oauthSignature = require('oauth-signature');

var baseUrl = 'https://api.yelp.com/v2';
var searchRadius = 5 * 1609; //miles * meters/mile

export default /*@ngInject*/ function ($q, YELP_KEY, YELP_SECRET, TOKEN, SECRET) {
  console.log('got a key!', oauthBase());

  return {
    nearby: _nearby
  };

  function _nearby(category){
    getPosition.then(function(pos){
      return params = {
        'category_filter': category,
        'radius_filter': searchRadius,
        'll': _.join([pos.lat, pos.lng],',')
      }

    })
    .then(function(params){
      var url = baseUrl
      $http({
        url: myUrl,
        method: 'GET',
        params: params,
        paramSerializer: '$httpParamSerializerJQLike'
      });
    })
  }

  function getPosition() {
    return $q.resolve({
      lat: 42.331389,
      lng: -83.045833
    })
  }

  function authHeaders(method, url, params){
    if(!method){ method = 'GET'; }
    angular.extend(params, oauthBase());
    var signature = oauthSignature.generate(method, url, params, YELP_SECRET, SECRET);

    return {
      params: params,
      signature: signature
    }
  }

  function oauthBase(){
    return {
        oauth_consumer_key : YELP_KEY,
        oauth_token : SECRET,
        oauth_nonce : nonce(),
        oauth_timestamp : Date.now(),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
    }
    function nonce() {
      var chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var vals = _.times(_.random(10, 30), function(){
        return chars[_.random(chars.length -1)];
      });
      return 'nearby' + vals.join('');
    }
  }
}
