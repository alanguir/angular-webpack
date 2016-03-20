export default /*@ngInject*/ function (CategoryFactory, YelpFactory, $routeParams, $location) {
  var vm = this;
  vm.limits = {
    page: 0,
    perPage: 3,
    totalResults: 0,
    totalPages: 0
  }
  vm.searchTerm = $routeParams.category;
  var resultsForPage = _.partial(YelpFactory.nearby, vm.searchTerm, vm.limits.perPage);

  showPage(0);

  CategoryFactory.label(vm.searchTerm)
    .then(function(label){
      if(label){
        vm.category = label;
      }
    });

  vm.nextPage = scrub.bind(null, 1)
  vm.prevPage = scrub.bind(null, -1)

  vm.focusOn = function(business) {
    console.log('focusing on', business);
    YelpFactory.metaCache(business);
    $location.path('/business/' + business.id);
  }

  function scrub(distance) {
    var currentPage = vm.limits.page;
    currentPage += distance;
    if(currentPage < 0){ currentPage = 0; }
    if(currentPage > vm.limits.totalPages){ currentPage = vm.limits.totalPages; }

    if(currentPage != vm.limits.page){
      console.log('new page, updating...');
      vm.limits.page = currentPage;
      showPage(currentPage);
    } else {
      console.log('nothing to see here')
    }
  }

  function showPage(page) {
    var oldResults = vm.results;
    vm.loading = true;
    vm.results = [{}, {}, {}];
    return resultsForPage(page)
      .then(processResults)
      .then(function(results) {
        console.log(results);
        vm.results = results.businesses;
        return vm.results
      })
      .catch(function() {
        vm.results = oldResults;
      })
      .finally(function() {
        vm.loading = false;
      });
  }

  function processResults(results) {
    if(results.data){results = results.data}
    vm.limits = _.assign(vm.limits, trackTotalForResults(results, vm.limits));
    return results;
  }

  function trackTotalForResults(res, lim) {
    var update = {};
    if(res.total && res.total !== lim.totalResults) {
      update = {
        totalResults: res.total,
        totalPages: Math.ceil(res.total/lim.perPage) -1
      };
    }
    return update;
  }
}
