export default /*@ngInject*/ function (YelpFactory, $stateParams, $state, MAPBOX) {
  var vm = this;
  vm.id = $stateParams.id;
  vm.details = YelpFactory.metaCache();

  if (!vm.details || vm.details.id != vm.id) {
    // pull from cache if visiting from search page, or fetch if deep linking
    YelpFactory.details(vm.id)
      .then(processResults)
      .then(function(results) {
        console.log('business details: ', results);
        vm.details = results;
        calcDistance(vm.details);
        setMapUrl(vm.details);
      })
  } else if(vm.details){
    calcDistance(vm.details)
  }

  vm.goBack = function(){
    $state.go('search');
  }

  var _url =  'https://api.mapbox.com'
      _url += '/v4/<%=map_id%>/<%=overlay%>/<%=position%>/'
      _url += '<%=width%>x<%=height%>.<%=format%>'
      _url += '?access_token=' + MAPBOX;
  var mapUrl = _.template(_url);

  function setMapUrl(details){
    var options = {
      width: 420,
      height: 480,
      position: details.location.coordinate.longitude + ',' + details.location.coordinate.latitude + ',15',
      format: 'jpg90',
      map_id: '13protons.pfbp052a'
    }
    options.overlay = 'pin-m('+options.position+')'

    vm.mapUrl = mapUrl(options);
  }

  function calcDistance(details) {
    return YelpFactory.distance({
      latitude: details.location.coordinate.latitude,
      longitude: details.location.coordinate.longitude
    })
    .then(function(distance) {
      console.log('distance', distance)
      vm.distance = distance;
    });
  }

  function processResults(results) {
    if (results.data) { results = results.data; }
    return results;
  }

}
