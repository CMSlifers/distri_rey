<template>
  <v-app>
    <v-main>
      <HelloWorld/>
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
      drawer: true,
      rail: true,
    }
  },
}






</script>
