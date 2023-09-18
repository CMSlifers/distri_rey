<template>
  <v-app class="body">
    <v-main>
    <v-toolbar app color="primary" class="toolbar">
   <v-app-bar-nav-icon @click="drawer = ! drawer"></v-app-bar-nav-icon>
    

    <v-toolbar-title>Distribuciones Rey 👑</v-toolbar-title>
    <v-btn class="login"  to="/ViewLogin">LOG IN</v-btn>
    </v-toolbar>
    

    <v-navigation-drawer app v-model="drawer" temporary color="" class="navdrawer">
      <v-layout mt-5 column align-center>
        
        <v-list class="listadrawer" >
          <v-list-subheader>Menu</v-list-subheader>
       

          <br>
        <v-list-item class="list-group" prepend-icon="mdi mdi-home" title="Home" value="home" to="ViewHome"></v-list-item>


        <v-list-group  value="Personas" prepend-icon="mdi-account-group-outline">
          <template v-slot:activator="{ props }">
            <v-list-item class="list-group"
              v-bind="props"
              title="Personas"
            ></v-list-item>
          </template>
            <v-list-item class="list-items" prepend-icon="mdi-account" title="Proveedores" value="proveedores" to="/ViewProveedores"></v-list-item>
            <v-list-item class="list-items" prepend-icon="mdi mdi-account-tie" title="Clientes" value="clientes" to="/ViewClientes"></v-list-item>  
            <v-list-item class="list-items" prepend-icon="mdi mdi-account-group" title="Usuarios" value="users" to="/ViewUsuarios"></v-list-item>      
        </v-list-group>

        <v-list-group   value="Productos" prepend-icon="mdi mdi-file-table-box-multiple">
          <template v-slot:activator="{ props }">
            <v-list-item class="list-group"
              v-bind="props"
              title="Productos"
            ></v-list-item>
          </template> 
            <v-list-item class="list-items" prepend-icon="mdi mdi-shape-plus" title="Categoria" value="categoria" to="/ViewCategoria"></v-list-item>  
            <v-list-item class="list-items" prepend-icon="mdi mdi-table-large" title="Inventarios" value="inventarios" to="/ViewInventario"></v-list-item> 
            <v-list-item class="list-items" prepend-icon="mdi mdi-currency-usd" title="Precios" value="precio" to="/ViewPrecios"></v-list-item> 
            <v-list-item class="list-items" prepend-icon="mdi-account-group-outline" title="Productos" value="productos" to="/ViewProductos"></v-list-item>
            
   
        </v-list-group>

        <v-list-group  value="Transacciones" prepend-icon="mdi mdi-shape-plus">
          <template v-slot:activator="{ props }">
            <v-list-item class="list-group"
              v-bind="props"
              title="Transacciones"
            ></v-list-item>
          </template>     
            <v-list-item class="list-items" prepend-icon="mdi mdi-shopping" title="Compras" value="compras" to="/ViewCompras" ></v-list-item>
            <v-list-item class="list-items" prepend-icon="mdi mdi-account-cash" title="Ventas" value="ventas" to="ViewVentas"></v-list-item>   
        </v-list-group>









        </v-list>


      </v-layout>
     

    </v-navigation-drawer>
  </v-main>
    <v-main><router-view></router-view></v-main>  
  </v-app>

</template>

<script>
/* import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
 */

 export default {
  name: 'App',

  components: {
  
},

  data() {
    return {
      drawer: false,
      rail: true,
    }
  },
}

</script>

<style scoped>

.navdrawer{
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    width: 15px;
    background: linear-gradient(rgba(5,7,12, 0.65),rgba(5,7,12, 0.65));
    color: #ffffff;
}

.list-items:hover{
    background: #0a8114;
    color: #ffffff;
}
.list-group:hover{
    background: #1A237E;
    color: #ffffff;
}

.login:hover{
  background: #0a8114;
    color: #ffffff;
}
.body-1111{
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(rgba(5,7,12, 0.85),rgba(5,7,12, 0.85)), url(/src/assets/img/imagen13.jpg);
    background-size: cover;
    background-position: center; 

}

</style>