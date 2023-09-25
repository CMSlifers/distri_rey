import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    usuarioLogueado: ``,
  }),

  actions: {
    // Método para actualizar el nombre del usuario
    setUsuarioLogueado(usuario) {
      this.user = usuario;
    },
  },
});

