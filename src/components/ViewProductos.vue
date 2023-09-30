<template>
  <v-container>
    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
      <template v-slot:top>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>Productos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="white" dark class="mb-2" v-bind="props" @click="llamarCategoria">
                Crear Productos
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
                      <v-text-field v-model="editedItem.cod" label="Cod. Producto"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="nombre Producto"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-combobox :rules="[rules.required]" return-object auto-select-first="exact"
                        v-model="editedItem.catego" label="Categoria" :items="datosCategoria" item-title="categoria">
                      </v-combobox>
                    </v-col>
                  </v-row>
                </v-container>


              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Añadir Nuevo Usuario
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">¿Seguro desea eliminar este producto?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" color="primary" class="me-2" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" color="red" @click="deleteItem(item.raw)">
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

export default {


  data: () => ({
    contadorProductos: {
      contador: 0,
      contadorid: 0
    },

    datosCategoria: [],

    rules: {
      required: value => !!value || 'Field is required',
    },

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
      { title: 'cod', key: 'cod' },
      { title: 'Nombre', key: 'nombre' },
      { title: 'Categoria', key: 'categoria' },
      { title: 'Actions', key: 'actions' },
    ],

    desserts: [],

    editedIndex: -1,

    /*Aqui se deben cambiar los datos dependiendo el componente*/
    editedItem: {
      keyid: '',
      id: 0,
      cod: 0,
      nombre: 0,
      catego: 0,
    },

    defaultItem: {
      name: '',
      id: 0,
      cod: 0,
      nombre: 0,
      catego: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Productos'
    },
  },

  created() {
    this.listarDatos()
  },

  methods: {

    //Mediante esta función podemos llamar y guardar los datos del contador en nuestro objeto 
    async llamarContador() {
      const contadorColRef = collection(db, 'contadores');
      const queryContador = query(contadorColRef);
      const datosContador = await getDocs(queryContador);
      datosContador.forEach((doc) => {
        this.contadorProductos.contadorid = doc.id;
        this.contadorProductos.contador = doc.data().contadorProductos;
      })
    },

    //Esta función nos permite aumentar el contador 
    incrementarContador() {
      this.contadorProductos.contador++;
      this.actualizarContador();
    },

    //Esta función permite actualizar el valor del contador en la base de datos
    async actualizarContador() {
      const Ref = doc(db, 'contadores', this.contadorProductos.contadorid);
      await updateDoc(Ref, {
        contadorProductos: this.contadorProductos.contador
      })
    },

    /*Este es le metodo que nos permite agregar nuevos datos a firebase*/
    async crearRegistros() {
      const colRef = collection(db, 'productos')
      const dataObj = {
        id: this.contadorProductos.contador,
        cod: this.editedItem.cod,
        nombre: this.editedItem.nombre,
        categoria: this.editedItem.catego.categoria
      }
      await addDoc(colRef, dataObj);
      this.incrementarContador();
    },

    /*Este metodo Limpia la grilla tan pronto se crea un nuevo usuario para evitar errores*/
    async limpiarCrud() {
      this.desserts = []
    },

    /*Este metodo Elimina un documento de la base de datos guiandose por el id*/
    async eliminarDocumentos() {
      await deleteDoc(doc(db, "productos", this.editedItem.keyid));
    },

    /*Este metodo nos permite actualizar los datos en la base de datos */
    async actualizarDatos() {
      console.log(this.editedItem.keyid)
      const Ref = doc(db, "productos", this.editedItem.keyid);
      await updateDoc(Ref, {
        cod: this.editedItem.cod,
        nombre: this.editedItem.nombre,
      })
    },

    /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
    async listarDatos() {
      const q = query(collection(db, "productos"));
      const resul = await getDocs(q);
      resul.forEach((doc) => {
        console.log("id", doc.id);
        this.desserts.push({
          keyid: doc.id,
          id: doc.data().id,
          cod: doc.data().cod,
          nombre: doc.data().nombre,
          categoria: doc.data().categoria,
        })
        this.limpiarListaCategoria()
      });
    },

    // Esta función nos permite llamar y almacenar los datos de las distintas categorias desde la base de datos
    async llamarCategoria() {
      const categoriaColRef = collection(db, 'categoria');
      const queryCate = query(categoriaColRef);
      const datosCate = await getDocs(queryCate);
      datosCate.forEach((doc) => {
        this.datosCategoria.push({
          categoria: doc.data().categoria
        })
      })
      this.llamarContador();
    },

    //Esta función similar a limpiarCrud() nos permite borrar los datos de nuestro array para poder mostar los datos nuevos o aactualizados
    async limpiarListaCategoria() {
      this.datosCategoria = [];
    },

    initialize() {
      this.desserts = [
        /*         {
        
                  id: 2,
                  usuario: "SaToPi",
                  nombre: 24,
                  linea: Calzado,
                },
        */
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