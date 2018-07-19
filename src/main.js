import 'buefy/lib/buefy.css'

import Vue from 'vue'
import App from './App.vue'

import { Observable, Subject, Subscription} from 'rxjs'
import VueRx from 'vue-rx'

import Buefy from 'buefy'

import Axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(VueRx, {
  Observable, Subject, Subscription
})
Vue.use(Buefy)
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
