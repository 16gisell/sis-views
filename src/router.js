import Vue from "vue";
import Router from "vue-router";
import AppHeader1 from "./layout/AppHeader1.vue";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter.vue";
import Components from "./views/Components.vue";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import ResetPassword from "./views/auth/ResetPasword.vue";
import UpdatePassword from "./views/auth/UpdatePasword";
import Consultar from "./views/Consulta.vue";

Vue.use(Router);
export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader1,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader1,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/registrar",
      name: "register",
      components: {
        header: AppHeader1,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/restPassword",
      name: "RestPassword",
      components: {
        header: AppHeader1,
        default: ResetPassword,
        footer: AppFooter
      }
    },
    {
      path: "/updatePassword",
      name: "UpdatePassword",
      components: {
        header: AppHeader1,
        default: UpdatePassword,
        footer: AppFooter
      }
    },
    {
      path: "/consultar",
      name: "consultar",
      components: {
        header: AppHeader,
        default: Consultar,
        footer: AppFooter
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
