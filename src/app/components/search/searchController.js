export default /*@ngInject*/ function (CategoryFactory, YelpFactory, $routeParams) {
  var vm = this;
  vm.searchTerm = $routeParams.category;
  CategoryFactory.label(vm.searchTerm)
    .then(function(label){
      if(label){
        vm.category = label;
      }
    })

  YelpFactory.nearby(vm.searchTerm)
    .then(function(results){
      vm.results = results;
    })
}
