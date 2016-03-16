export default /*@ngInject*/ function() {
  return {
    template: require('./template.html'),
    scope: {
      category: '=?'
    }
  }
}
