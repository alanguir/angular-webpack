import heading from './heading/directive';
import foot from './foot/directive';
import poster from './poster/directive';

export default angular.module('nearby.directives', [])
  .directive('heading',  heading)
  .directive('foot',  foot)
  .directive('poster',  poster);
