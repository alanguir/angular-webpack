export default /*@ngInject*/ function (CategoryFactory) {
  var vm = this;
  CategoryFactory.get()
    .then(function(cats){
      vm.categories = cats;
    })
}
