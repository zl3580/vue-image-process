

import vueImageProcess from './Imageprocess.vue'

const process = {};
process.install = function (Vue, options) {
  Vue.component(vueImageProcess.name, vueImageProcess);
  Vue.prototype.$msg = "cehng"
    
  
}
export default process