import Vue from 'vue'
import Router from 'vue-router'
import CDSGPW from '@/components/CDSGPW'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CDSGPW',
      component: CDSGPW
    }
  ]
})
