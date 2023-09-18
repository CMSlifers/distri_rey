<template>
    <div>

  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="../assets/dr.1.jpeg"
      ></v-img>

        <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>
  
        <v-text-field
          density="compact"
          placeholder="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Contraseña
  
<!--           <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a> -->
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Ingrese contraseña"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
<!--         <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Advertencia: después de 3 intentos fallidos consecutivos de inicio de sesión, su cuenta se bloqueará temporalmente durante tres horas. Si debe iniciar sesión ahora, también puede hacer clic en "¿Olvidó su contraseña de inicio de sesión?" a continuación para restablecer la contraseña de inicio de sesión.
          </v-card-text>
        </v-card> -->
  
        <v-btn
          block
          class="mb-8"
          size="large"
          variant="tonal"
        >
          Log In
        </v-btn>
  
<!--         <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text> -->
      </v-card>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const visible = ref(false)
  </script>
  
  <script>
    export default {
      data: () => ({
        visible: false,
      }),
    }
  </script>

<style scoped>

.mb-8{
  background: #1A237E;
  color:white;
}

.mb-8:hover{
  background: #2503e4;
  color:white;
}

</style>
