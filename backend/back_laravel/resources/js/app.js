require("./bootstrap");

window.Vue = require("vue");
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter(routes);

import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";

Vue.use(Toaster, { timeout: 5000 });

import Swal from "swetalert2";
window.Swal = Swal;

function loggedIn() {
    return true;
}

router.beforeEach((to, from) => {
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.requiresAuth && !auth.isLoggedIn()) {
        return {
            path: "/login",
            query: { redirect: to.fullPath },
        };
    }

    else if (to.matched.some(record => record.meta.guest)) {
        return {
            path: "/",
            query: { redirect: to.fullPath },
        };
    }
});
