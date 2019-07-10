import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import './assets/bootstrap.css'
import './assets/bootstrap.min.css'
import Vuex from 'vuex'
import {store} from './store/store'

Vue.use(Vuex)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
