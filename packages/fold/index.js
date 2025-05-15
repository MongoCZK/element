import Fold from './src/main';

/* istanbul ignore next */
Fold.install = function(Vue) {
  Vue.component(Fold.name, Fold);
};

export default Fold;
