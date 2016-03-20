export default /*@ngInject*/ function() {
  return {
    scope: {
      page: '=?',
      pages: '=?'
    },
    replace: true,
    template: require('./template.html')
  }
}
