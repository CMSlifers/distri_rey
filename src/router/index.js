import { createWebHistory, createRouter } from "vue-router";
import Hello from '../components/HelloWorld.vue'


const routes = [
/*     { path: "/", name: "Usuarios",component: Usuarios,}, */
    { path: "/Hello",name: "Hello",component: Hello, },
/*     { path: "/Viewusuarios",name: "Viewusuarios",component: ViewUsuarios, },
    { path: "/ViewProductos",name: "ViewProductos",component: ViewProductos, }, */

]

const router = createRouter({
    history: createWebHistory(), routes,
});

export default router;