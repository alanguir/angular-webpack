export default /*@ngInject*/ function (YelpFactory, $stateParams, $state) {
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
        calcDistance(vm.details)
      })
  } else if(vm.details){
    calcDistance(vm.details)
  }

  vm.goBack = function(){
    $state.go('search');
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
