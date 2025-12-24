import SplitterPanel from '../splitter/src/SplitterPanel';

/* istanbul ignore next */
SplitterPanel.install = function(Vue) {
  Vue.component(SplitterPanel.name, SplitterPanel);
};

export default SplitterPanel;
