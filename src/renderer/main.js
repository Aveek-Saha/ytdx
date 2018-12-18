import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen'
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons/faFileDownload'

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

library.add(faFolder, faFolderOpen, faMusic, faFileDownload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
