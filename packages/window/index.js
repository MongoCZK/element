import ElWindow from './src/main';

/* istanbul ignore next */
ElWindow.install = function(Vue) {
  Vue.component(ElWindow.name, ElWindow);
};

export default ElWindow;
