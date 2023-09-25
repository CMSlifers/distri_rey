<template>
  <v-container>
    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
      <template  v-slot:top>
        <v-toolbar class="crud-title" flat>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="white" dark class="mb-2" v-bind="props">
                Crear Usuario
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <ul>

                </ul>
                <v-container>
                  <v-row>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.dni" label="dni"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.usuario" label="usuario"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.rol" label="rol"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.password" label="password"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container>
                  <p>Direccion:</p>
                  <v-row>

                    <v-col cols="12" sm="6" md="8">
                      <v-combobox :rules="[rules.required]" return-object auto-select-first="exact"
                        v-model="editedItem.departamento" clearable label="Departamento" :items="itemsDeps"
                        item-title="departamento">
                      </v-combobox>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-combobox :rules="[rules.required]" return-object auto-select-first="exact"
                        v-model="editedItem.via" label="Tipo de Vía" :items="itemsVia" item-title="tipo">
                      </v-combobox>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.vianum1" label="Segun tipo de via"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.vianum2" label="#"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.vianum3" label="-"></v-text-field>
                    </v-col>

                    <!--                     <v-col cols="12" sm="6" md="8">
                      <v-combobox auto-select-first="exact" return-object clearable label="Ciudad" :items="itemsDeps"
                        item-title="ciudades">
                      </v-combobox>
                    </v-col>
 -->
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
import { collection, getDocs, query, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { colombiaJS } from "/colombia.js";

console.log("Segundo colombia js")
console.log(colombiaJS)
export default {


  data: () => ({
    rules: {
      required: value => !!value || 'Field is required',
    },

    itemsDeps: colombiaJS,
    itemsVia: [
      { id: 0, tipo: "Anillo" },
      { id: 1, tipo: "Autopista" },
      { id: 2, tipo: "Avenida" },
      { id: 3, tipo: "Avenida Calle" },
      { id: 4, tipo: "Avenida Carrera" },
      { id: 5, tipo: "Calle" },
      { id: 6, tipo: "Carrera" },
      { id: 7, tipo: "Circular" },
      { id: 8, tipo: "Diagonal" },
      { id: 0, tipo: "Transversal" }
    ],

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
      { title: 'DNI', key: 'dni' },
      { title: 'Nombre', key: 'nombre' },
      { title: 'Usuario', key: 'usuario' },
      { title: 'Email', key: 'email' },
      { title: 'Rol', key: 'rol' },
      { title: 'Contraseña', key: 'password' },
      { title: 'Direccion', key: 'direccion' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    /*Aqui se deben cambiar los datos dependiendo el componente*/
    editedItem: {
      keyid: '',
      id: 0,
      dni: 0,
      nombre: 0,
      usuario: 0,
      email: 0,
      rol: 0,
      password: 0,
      via: 0,
      vianum1: 0,
      vianum2: 0,
      vianum3: 0,
      departamento: 0,
      direccion: 0,
    },
    defaultItem: {
      name: '',
      id: 0,
      dni: 0,
      nombre: 0,
      usuario: 0,
      email: 0,
      rol: 0,
      password: 0,
      via: 0,
      vianum1: 0,
      vianum2: 0,
      vianum3: 0,
      departamento: 0,
      direccion: 0,
    },


  }),



  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    async limpiarCrud() {

      this.desserts = []

    }
    ,

    /*Este es le metodo que nos permite agregar nuevos datos a firebase*/

    async crearRegistros() {
      const colRef = collection(db, 'usuarios')
      console.log(this.editedItem.name, this.editedItem.id, this.editedItem.usuario, this.editedItem.nombre, this.editedItem.password,)

      const dataObj = {
        id: this.editedItem.id,
        dni: this.editedItem.dni,
        nombre: this.editedItem.nombre,
        usuario: this.editedItem.usuario,
        email: this.editedItem.email,
        rol: this.editedItem.rol,
        via: this.editedItem.via,
        vianum1: this.editedItem.vianum1,
        vianum2: this.editedItem.vianum2,
        vianum3: this.editedItem.vianum3,
        password: this.editedItem.password,
        departamento: this.editedItem.departamento.departamento,
        direccion: this.editedItem.via.tipo + ' ' + this.editedItem.vianum1 + ' # '+this.editedItem.vianum2 + ' - '+this.editedItem.vianum3 + " de " + this.editedItem.departamento.departamento,



      }
      const docRef = await addDoc(colRef, dataObj);
      console.log("Creo el usuario con nombre", docRef.id);

    },
    /*Este metodo nos permite actualizar los datos en la base de datos */
    async actualizarDatos() {
      console.log(this.editedItem.keyid)
      const Ref = doc(db, "usuarios", this.editedItem.keyid);
      await updateDoc(Ref, {
        dni: this.editedItem.dni,
        nombre: this.editedItem.nombre,
        usuario: this.editedItem.usuario,
        email: this.editedItem.email,
        rol: this.editedItem.rol,
        password: this.editedItem.password,
        via: this.editedItem.via,
        vianum1: this.editedItem.vianum1,
        vianum2: this.editedItem.vianum2,
        vianum3: this.editedItem.vianum3,
        departamento: this.editedItem.departamento,
        direccion: this.editedItem.via.tipo + ' ' + this.editedItem.vianum1 + ' # '+this.editedItem.vianum2 + ' - '+this.editedItem.vianum3 + " de " + this.editedItem.departamento.departamento,


      })

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
          dni: doc.data().dni,
          nombre: doc.data().nombre,
          usuario: doc.data().usuario,
          email: doc.data().email,
          rol: doc.data().rol,
          password: doc.data().password,
          direccion: doc.data().direccion,
          departamento: doc.data().departamento,
          via: doc.data().via,
          vianum1: doc.data().vianum1,
          vianum2: doc.data().vianum2,
          vianum3: doc.data().vianum3,
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
        this.actualizarDatos();
        this.limpiarCrud();
        this.listarDatos();
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
    
<style scoped>
.crud-title{
    background-color:#1A237E;
    color: white;
}</style>