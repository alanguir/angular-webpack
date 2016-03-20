export default /*@ngInject*/ function($filter) {
  return {
    template: require('./template.html'),
    scope: {
      url: '=?',
      size: '=?'
    },
    restrict: 'A',
    replace: true,
    link: function(scope, element, attrs) {
      scope.class = attrs.class;
      if (scope.url) {
        var url = $filter('scaleImg')(scope.url, scope.size);
        scope.bgStyle = {
          'background-image': 'url(' + url + ')'
        };
      } else {
        scope.class += ' placeholder';
      }
    }
  }
}
