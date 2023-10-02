<template>
  <v-app class="body">
    <v-main>
    <v-toolbar app color="primary" class="toolbar" @click="UserLog">
   <v-app-bar-nav-icon @click="drawer = ! drawer"></v-app-bar-nav-icon>    

    <v-toolbar-title>DISTRIBUCIONES REY</v-toolbar-title>
    <v-btn v-if="rol === 'View'" class="login"  @click="login">LOG IN</v-btn>
    <v-btn v-if="rol === 'ADMIN' || rol === 'VENDEDOR'" class="loginOut" @click="logout">LOG OUT</v-btn>
    <div v-if="mensajeLogout">{{ mensajeLogout }}</div>

    </v-toolbar>
    

    <v-navigation-drawer width = '280' app v-model="drawer" temporary color="" class="navdrawer" >
      <v-layout mt-5 column align-center>

        
        <v-list class="listadrawer ">
          <v-img
              class="mx-auto my-6"
              max-width="128"
              src="./assets/dr.1.jpeg"
           
          ></v-img>

          <p style="margin-left: 20px; margin-top: 1px; margin-bottom: 13px;">{{ rol }}: {{ dato }}</p>   

        <v-list-item v-if="rol !== 'View'" class="list-group" prepend-icon="mdi mdi-home" title="Home" value="home" to="/"  @click="UserLog"></v-list-item>


        <v-list-group v-if="rol !== 'View'" value="Personas" prepend-icon="mdi-account-group-outline"  @click="UserLog">
          <template v-slot:activator="{ props }">
            <v-list-item class="list-group"
              v-bind="props"
              title="Personas"
            ></v-list-item>
          </template>
            <v-list-item v-if="rol === 'ADMIN'" class="list-items" prepend-icon="mdi-account" title="Proveedores" value="proveedores" to="/ViewProveedores"></v-list-item>
            <v-list-item class="list-items" prepend-icon="mdi mdi-account-tie" title="Clientes" value="clientes" to="/ViewClientes"></v-list-item>  
            <v-list-item v-if="rol === 'ADMIN'" class="list-items" prepend-icon="mdi mdi-account-group" title="Usuarios" value="users" to="/ViewUsuarios"></v-list-item>      
        </v-list-group>

        <v-list-group v-if="rol !== 'View'" value="Productos" prepend-icon="mdi mdi-file-table-box-multiple"  @click="UserLog">
          <template v-slot:activator="{ props }">
            <v-list-item class="list-group"
              v-bind="props"
              title="Productos"
            ></v-list-item>
          </template> 
            <v-list-item v-if="rol === 'ADMIN'" class="list-items" prepend-icon="mdi mdi-shape-plus" title="Categoria" value="categoria" to="/ViewCategoria"></v-list-item>  
            <v-list-item class="list-items" prepend-icon="mdi mdi-table-large" title="Inventarios" value="inventarios" to="/ViewInventario"></v-list-item> 
            <v-list-item class="list-items" prepend-icon="mdi mdi-currency-usd" title="Precios" value="precio" to="/ViewPrecios"></v-list-item> 
            <v-list-item  v-if="rol === 'ADMIN'" class="list-items" prepend-icon="mdi-account-group-outline" title="Productos" value="productos" to="/ViewProductos"></v-list-item>
            
   
        </v-list-group>

        <v-list-group v-if="rol !== 'View'" value="Transacciones" prepend-icon="mdi mdi-shape-plus" @click="UserLog">
          <template v-slot:activator="{ props }">
            <v-list-item class="list-group"
              v-bind="props"
              title="Transacciones"
            ></v-list-item>
          </template>     
            <v-list-item v-if="rol === 'ADMIN'" class="list-items" prepend-icon="mdi mdi-shopping" title="Compras" value="compras" to="/ViewCompras" ></v-list-item>
            <v-list-item class="list-items" prepend-icon="mdi mdi-account-cash" title="Ventas" value="ventas" to="ViewVentas"></v-list-item>   
        </v-list-group>



        </v-list>
      </v-layout>   



    </v-navigation-drawer>

    <v-main>
        <router-view></router-view>
    </v-main>

  </v-main>
  </v-app>

</template>

<script>

 export default {
  name: 'App',  
  components: {
  
},

  data() {
    return {
      drawer: false,
      rail: true,
      dato: this.$store.state.usuario,
      rol:this.$store.state.rol,
      fechaAct:this.$store.state.fechaActual,
  

      
    }
  },

  methods: {

    login() {
         
      this.$router.push({ name: 'ViewLogin' });
      this.dato = this.$store.state.usuario;
    /*   console.log("datos ",this.$store.state.usuario); */
    },

    logout() {
      //incluir codigo para destruir sesion
 
      this.$router.push({ name: 'ViewHome' }); // redirecciona a login
        window.alert(this.$store.state.usuario + ', has cerrado sesión!');
        this.$store.state.usuario = ""
        this.$store.state.rol = "View"
  
        
    },

    UserLog() {
         this.dato = this.$store.state.usuario;
         this.rol = this.$store.state.rol;
    }


  },  

}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

.navdrawer{
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    width: 15px;
    background: linear-gradient(rgba(5,7,12, 0.65),rgba(5,7,12, 0.65));
    color: #ffffff;
}

.list-items:hover{
    background: #ffffff;
    color: #1A237E;
}
.list-group:hover{
    background: #1A237E;
    color: #ffffff;
}

.login:hover{
  background: #0a8114;
    color: #ffffff;
}
.loginOut:hover{
  background: #d40723;
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