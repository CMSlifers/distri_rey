import { createWebHistory, createRouter } from "vue-router";
import ViewLogin from '../components/ViewLogin.vue'
import ViewHome from '../components/ViewHome.vue'
import ViewProveedores from '../components/ViewProveedores.vue'
import ViewClientes from '../components/ViewClientes.vue'
import ViewUsuarios from '../components/ViewUsuarios.vue'
import ViewCategoria from '../components/ViewCategoria.vue'
import ViewInventario from '../components/ViewInventario.vue'
import ViewPrecios from '../components/ViewPrecios.vue'
import ViewProductos from '../components/ViewProductos.vue'
import ViewCompras from '../components/ViewCompras.vue'
import ViewVentas from '../components/ViewVentas.vue'
const routes = [
    { path: "/ViewLogin", name: "ViewLogin",component: ViewLogin}, 
    { path: "/ViewHome", name: "ViewHome",component: ViewHome}, 
    /* phat personas */
    { path: "/ViewProveedores",name: "Viewproveedores",component: ViewProveedores, },
    { path: "/ViewClientes",name: "Viewclientes",component: ViewClientes, },
    { path: "/ViewUsuarios",name: "Viewusuarios",component: ViewUsuarios, },
     /* phat productos */
    { path: "/ViewCategoria", name: "ViewCategoria",component: ViewCategoria}, 
    { path: "/ViewInventario",name: "ViewInventario",component: ViewInventario, },
    { path: "/ViewPrecios",name: "ViewPrecios",component: ViewPrecios, },
    { path: "/ViewProductos",name: "ViewProductos",component: ViewProductos, },
    /* phat transacciones */
    { path: "/ViewCompras",name: "ViewCompras",component: ViewCompras, },
    { path: "/ViewVentas",name: "ViewVentas",component: ViewVentas, },
    /*    { path: "/Hello",name: "Hello",component: Hello, },  */
]

const router = createRouter({
    history: createWebHistory(), routes,
});

export default router;