<template>
  <v-container>
    <h1>Usuarios</h1>
    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark class="mb-2" v-bind="props">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.usuario" label="usuario"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.password" label="password"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Añadir Nuevo Usuario
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item.raw)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
  

<script>

import db from '../firebase/init.js'
import { collection, getDocs, query, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        /* title: 'Dessert (100g serving)' */
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Id', key: 'id' },
      { title: 'Usuario', key: 'usuario' },
      { title: 'Nombre', key: 'nombre' },
      { title: 'password', key: 'password' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
      /*Aqui se deben cambiar los datos dependiendo el componente*/
    editedItem: {
      keyid: '',
      id: 0,
      usuario: 0,
      nombre: 0,
      password: 0,
    },
    defaultItem: {
      name: '',
      id: 0,
      usuario: 0,
      nombre: 0,
      password: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },



  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.listarDatos()
  },

  methods: {

        /*Este metodo Elimina un documento de la base de datos guiandose por el id*/
    async eliminarDocumentos() {
      await deleteDoc(doc(db, "usuarios", this.editedItem.keyid));

    },

        /*Este metodo Limpia la grilla tan pronto se crea un nuevo usuario para evitar errores*/
    async limpiarCrud(){

      this.desserts=[]
     
    }
    ,
        /*Este metodo nos permite actualizar los datos en la base de datos */
    async actualizarDatos() {
      console.log(this.editedItem.keyid)
      const Ref = doc(db, "usuarios", this.editedItem.keyid);
      await updateDoc(Ref, {
        usuario: this.editedItem.usuario,
        nombre: this.editedItem.nombre,
        password: this.editedItem.password,

      })

    },

      /*Este es le metodo que nos permite agregar nuevos datos a firebase*/

    async crearRegistros() {
      const colRef = collection(db, 'usuarios')
      console.log(this.editedItem.name, this.editedItem.id, this.editedItem.usuario, this.editedItem.nombre, this.editedItem.password,)
      const dataObj = {
        id: this.editedItem.id,
        usuario: this.editedItem.usuario,
        nombre: this.editedItem.nombre,
        password: this.editedItem.password,

      }
      const docRef = await addDoc(colRef, dataObj);
      console.log("Creo el usuario con nombre", docRef.id);
   
    },

          /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/

    async listarDatos() {

      const q = query(collection(db, "usuarios"));
      const resul = await getDocs(q);
      resul.forEach((doc) => {

        console.log("id", doc.id);
        this.desserts.push({
          keyid: doc.id,
          id: doc.data().id,
          usuario: doc.data().usuario,
          nombre: doc.data().nombre,
          password: doc.data().password
        })

      })

    },

   
    initialize() {
      this.desserts = [
        /*         {
        
                  id: 2,
                  usuario: "SaToPi",
                  nombre: 24,
                  password: "olis",
                },
                {
        
                  id: 3,
                  usuario: "YK2",
                  nombre: "Carlos Jimenez",
                  password: "12345",
                }, */
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true;

    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true;

    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete();
      this.eliminarDocumentos()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.actualizarDatos()
      } else {
        this.desserts.push(this.editedItem)
        this.crearRegistros();
        this.limpiarCrud();
        this.listarDatos();
      }
      this.close()

    },


  },

}
</script>
  