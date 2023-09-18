import { createWebHistory, createRouter } from "vue-router";
import ViewLogin from '../components/ViewLogin.vue'



const routes = [
    { path: "/ViewLogin", name: "ViewLogin",component: ViewLogin}, 
    /*    { path: "/Hello",name: "Hello",component: Hello, },  */
/*     { path: "/Viewusuarios",name: "Viewusuarios",component: ViewUsuarios, },
    { path: "/ViewProductos",name: "ViewProductos",component: ViewProductos, }, */

]

const router = createRouter({
    history: createWebHistory(), routes,
});

export default router;