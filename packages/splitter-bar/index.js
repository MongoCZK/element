import SplitterBar from '../splitter/src/SplitterBar';

/* istanbul ignore next */
SplitterBar.install = function(Vue) {
  Vue.component(SplitterBar.name, SplitterBar);
};

export default SplitterBar;
