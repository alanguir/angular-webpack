export default /*@ngInject*/ function (CategoryFactory, $location) {
  var vm = this;
  CategoryFactory.get()
    .then(function(cats){
      vm.categories = cats;
    })

  vm.oversize = function(text){
    if (text.length > 15){ return true; }
  }

  vm.search = function(category){
    console.log('search for', category);
    $location.path('/search/' + category);
  }
}
