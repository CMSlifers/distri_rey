<template>
  <v-container>
    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
      <template v-slot:top>
        <v-toolbar class="crud-title" flat>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn @click="llamarContador()" color="white" dark class="mb-2" v-bind="props">
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
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row>

                      <!--  <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                    </v-col> -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.identificacion" required :rules="dniRules"
                          label="Identificación"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.usuario" label="Usuario"></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.email" :rules="emailRules" label="E-mail"
                          required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select v-model="editedItem.rol" :items="['ADMIN', 'VENDEDOR']" label="Rol"></v-select>
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
                        <v-combobox :rules="[v => !!v || 'Seleccione un departamento']" requiered
                          auto-select-first="exact" v-model="editedItem.departamento" clearable label="Departamento"
                          :items="colombiaJS" item-title="departamento">

                        </v-combobox>
                      </v-col>
                      <!--El siguiente botón permite buscar las ciudades correspondientes según el dep seleccionado-->
                      <v-col cols="12" sm="2" md="2">
                        <v-btn v-if="this.editedItem.departamento" required @click="agregarDepartamentos"
                          label="Desplegar ciudades" color="primary" icon="mdi mdi-check-circle"></v-btn>
                      </v-col>

                      <v-col v-if="this.editedItem.departamento" id="combobox-ciudades" cols="12" sm="6" md="8">
                        <v-combobox auto-select-first="exact" return-object clearable label="Ciudad"
                          :items="itemsCiudades" item-title="ciudad" v-model="editedItem.ciudad">
                        </v-combobox>

                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-combobox :rules="[v => !!v || 'Seleccione el tipo de vía de su dirección']" requiered
                          return-object auto-select-first="exact" v-model="editedItem.via" label="Tipo de Vía"
                          :items="itemsVia" item-title="tipo">
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

                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <!--  <v-btn v-if="editedItem.departamento !== 0 & editedItem.via !== 0" color="blue-darken-1" variant="text"
                  @click="save">
                  Añadir Nuevo Usuario
                </v-btn> -->
                <v-btn @click="validate" :disabled="!valid" color="blue-darken-1" variant="text">
                  Añadir Nuevo Usuario
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">¿Seguro que desea eliminar este Usuario?</v-card-title>
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
/* import Vue from "vue"; */
import { collection, getDocs, query, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { colombiaJS } from "/colombia.js";

export default {


  data: () => ({

    valid: true,

    dniRules: [
      v => !!v || 'Se requiere Identificación',
      v => (v && v.length >= 7) || 'Debe tener más de 7 dígitos'
    ],
    emailRules: [
        v => !!v || 'Se requiere e-mail',
        v => /.+@.+/.test(v) || 'El e-mail debe ser válido'
      ],

    contadorUsuarios: {
      contador: 0,
      contadorid: 0
    },

    itemsCiudades: [],
    colombiaJS,

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
      { title: 'Identificación', key: 'identificacion' },
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
      identificacion: 0,
      nombre: 0,
      usuario: 0,
      email: 0,
      rol: 0,
      password: 0,
      via: 0,
      vianum1: 0,
      vianum2: 0,
      vianum3: 0,
      departamento: null,
      ciudad: 0,
      direccion: 0,
    },

    defaultItem: {
      name: '',
      id: 0,
      identificacion: 0,
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
      ciudad: 0,
      direccion: 0,
    },
  }),


  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
  },


  created() {
    this.listarDatos()
  },

  methods: {
    
    //Esta funcion permite mostrar el boton si los campos requeridos estan completos
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
      this.save();
    },

    //Esta función permite separar las ciudades ya que estaban unidas en un msimo objeto, y las guarda en itemsCiudades
    agregarDepartamentos() {
      const ciudades = this.colombiaJS[this.editedItem.departamento.id].ciudades;
      this.itemsCiudades = ciudades.map(ciudad => ({
        ciudad: ciudad,
      }))
      console.log("Array ciduades", this.itemsCiudades)
    },

    //Mediante esta función podemos llamar y guardar los datos del contador en nuestro objeto 
    async llamarContador() {
      const contadorColRef = collection(db, 'contadores');
      const queryContador = query(contadorColRef);
      const datosContador = await getDocs(queryContador);
      datosContador.forEach((doc) => {
        this.contadorUsuarios.contadorid = doc.id;
        this.contadorUsuarios.contador = doc.data().contadorUsuarios;
      })
    },

    //Esta función nos permite aumentar el contador 
    incrementarContador() {
      this.contadorUsuarios.contador++;
      this.actualizarContador()
    },

    //Esta función permite actualizar el valor del contador en la base de datos
    async actualizarContador() {
      const Ref = doc(db, "contadores", this.contadorUsuarios.contadorid);
      await updateDoc(Ref, {
        contadorUsuarios: this.contadorUsuarios.contador
      })

    },

    /*Este es le metodo que nos permite agregar nuevos datos a firebase*/
    async crearRegistros() {
      const colRef = collection(db, 'usuarios')
      console.log(this.editedItem.name, this.editedItem.id, this.editedItem.usuario, this.editedItem.nombre, this.editedItem.password,)
      const dataObj = {
        id: this.contadorUsuarios.contador,
        identificacion: this.editedItem.identificacion,
        nombre: this.editedItem.nombre,
        usuario: this.editedItem.usuario,
        email: this.editedItem.email,
        rol: this.editedItem.rol,
        via: this.editedItem.via.tipo,
        vianum1: this.editedItem.vianum1,
        vianum2: this.editedItem.vianum2,
        vianum3: this.editedItem.vianum3,
        password: this.editedItem.password,
        departamento: this.editedItem.departamento.departamento,
        ciudad: this.editedItem.ciudad.ciudad,
        direccion: this.editedItem.via.tipo + ' ' + this.editedItem.vianum1 + ' # ' + this.editedItem.vianum2 + ' - ' + this.editedItem.vianum3 + " de " + this.editedItem.ciudad.ciudad + ", " + this.editedItem.departamento.departamento,
      }
      const docRef = await addDoc(colRef, dataObj);
      console.log("Creo el usuario con nombre", docRef.id);
      this.incrementarContador();
    },

    /*Este metodo Limpia la grilla tan pronto se crea un nuevo usuario para evitar errores*/
    async limpiarCrud() {
      this.desserts = []
    },

    /*Este metodo Elimina un documento de la base de datos guiandose por el id*/
    async eliminarDocumentos() {
      await deleteDoc(doc(db, "usuarios", this.editedItem.keyid));

    },

    /*Este metodo nos permite actualizar los datos en la base de datos */
    async actualizarDatos() {
      console.log(this.editedItem.keyid)
      const Ref = doc(db, "usuarios", this.editedItem.keyid);
      await updateDoc(Ref, {
        identificacion: this.editedItem.identificacion,
        nombre: this.editedItem.nombre,
        usuario: this.editedItem.usuario,
        email: this.editedItem.email,
        rol: this.editedItem.rol,
        password: this.editedItem.password,
        via: this.editedItem.via,
        vianum1: this.editedItem.vianum1,
        vianum2: this.editedItem.vianum2,
        vianum3: this.editedItem.vianum3,
        ciudad: this.editedItem.ciudad,
        departamento: this.editedItem.departamento,
        direccion: this.editedItem.via.tipo + ' ' + this.editedItem.vianum1 + ' # ' + this.editedItem.vianum2 + ' - ' + this.editedItem.vianum3 + " de " + this.editedItem.ciudad.ciudad + ", " + this.editedItem.departamento.departamento,
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
          identificacion: doc.data().identificacion,
          nombre: doc.data().nombre,
          usuario: doc.data().usuario,
          email: doc.data().email,
          rol: doc.data().rol,
          password: doc.data().password,
          direccion: doc.data().direccion,
          departamento: doc.data().departamento,
          ciudad: doc.data().ciudad,
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
    
<style scoped>
.crud-title {
  background-color: #1A237E;
  color: white;
}
</style>