import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(PaperDashboard);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    login(state) {
      localStorage.setItem('authenticated', 'yes')
      state.authenticated = true
    },
    logout(state) {
      localStorage.removeItem('authenticated')
      state.authenticated = false
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
