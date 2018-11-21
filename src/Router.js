import Vue from 'vue'
import VueRouter from 'vue-router'
import ImageProcess from './components/ImageProcess.vue'

Vue.use(VueRouter)
const router= new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'ImageProcess',
      component: ImageProcess
    }
  ]

})
// export default router
export {router}
