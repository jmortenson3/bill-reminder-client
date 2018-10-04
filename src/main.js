// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { router } from './router';
import { store } from './store';
import { MediaQueries } from 'vue-media-queries';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faCog,
  faCheckCircle,
  faSignOutAlt,
  faPlusCircle,
  faHandPointLeft,
  faHandPointRight,
  faLock,
  faEnvelope   } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrashAlt, faCog, faCheckCircle,
  faSignOutAlt, faPlusCircle, faHandPointLeft, faHandPointRight,
  faLock, faEnvelope);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const mediaQueries = new MediaQueries();
Vue.use(mediaQueries);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mediaQueries
});
