import heading from './heading/directive';
import foot from './foot/directive';

export default angular.module('nearby.directives', [])
  .directive('heading',  heading)
  .directive('foot',  foot);
