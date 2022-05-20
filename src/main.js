import Vue from 'vue'
import App from './App.vue'
import router from './routers/routers.js'
import store from './store/store.js'

Vue.config.productionTip = false

// bootstrap 5
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
