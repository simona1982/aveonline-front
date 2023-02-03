import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

// Global Guards
router.beforeEach((to, from, next) => {
  //console.log("ruta ", to);

  if (to.meta.requiresAuth) {
    const tokenUser = JSON.parse(window.localStorage.getItem("tokenUser"));
    // const authUser = JSON.parse(window.localStorage.getItem("authUser"));

    if (tokenUser.error !== true) {
      next();
    } else {
      next({ name: "login" });
    }
  }

  next();
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
