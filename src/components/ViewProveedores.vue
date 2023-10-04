<template>
    <v-container>

        <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1 ">
            <template v-slot:top>
                <v-toolbar class="crud-title" flat>
                    <v-toolbar-title>Proveedores</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn @click="imprimir" color="white" icon="mdi mdi-printer" title="Imprimir PDF"></v-btn>
                            <v-btn @click="llamarContador" color="white" dark class="mb-2" v-bind="props">
                                Nuevo Proveedor
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.nit" label="NIT" required
                                                    :rules="nitRules"></v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="editedItem.telefono" label="telefono"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.nombre" label="nombre"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <v-container>
                                        <p>Direccion:</p>
                                        <v-row>

                                            <v-col cols="12" sm="10" md="12">
                                                <v-combobox required :rules="[v => !!v || 'Seleccione un departamento']"
                                                    return-object auto-select-first="exact"
                                                    v-model="editedItem.departamento" clearable label="Departamento"
                                                    :items="colombiaJS" item-title="departamento">
                                                </v-combobox>
                                            </v-col>
                                            <v-col v-if="this.editedItem.departamento" @click="agregarDepartamentos"
                                                id="combobox-ciudades" cols="12" sm="6" md="8">
                                                <v-combobox auto-select-first="exact" return-object clearable label="Ciudad"
                                                    :items="itemsCiudades" item-title="ciudad" v-model="editedItem.ciudad">
                                                </v-combobox>

                                            </v-col>

                                            <v-col cols="12" sm="5" md="12">
                                                <v-combobox
                                                    :rules="[v => !!v || 'Seleccione el tipo de vía de su dirección']"
                                                    required return-object auto-select-first="exact"
                                                    v-model="editedItem.via" label="Tipo de Vía" :items="itemsVia"
                                                    item-title="tipo">
                                                </v-combobox>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.vianum1"
                                                    label="Segun tipo de via"></v-text-field>
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
                                <v-btn :disabled="!valid" @click="validate" color="blue-darken-1" variant="text">
                                    Añadir Nuevo Proveedor
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h6">¿Está seguro que desea eliminar este proveedor?</v-card-title>
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
import { collection, getDocs, query, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { colombiaJS } from "/colombia.js";
import jsPDF from 'jspdf';

export default {
    data: () => ({

        valid: true,

        nitRules: [
            v => !!v || 'Se requiere Identificación',
            v => (v && v.length >= 7) || 'Debe tener más de 7 dígitos'
        ],
        emailRules: [
            v => !!v || 'Se requiere e-mail',
            v => /.+@.+/.test(v) || 'El e-mail debe ser válido'
        ],

        contadorProveedores: {
            contador: 0,
            contadorid: 0,
        },

        rules: {
            required: value => !!value || 'Field is required',
        },

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
            { title: 'Nit', key: 'nit' },
            { title: 'Nombre', key: 'nombre' },
            { title: 'Email', key: 'email' },
            { title: 'Telefono', key: 'telefono' },
            { title: 'Direccion', key: 'direccion' },
            { title: 'Acciones', key: 'actions', sortable: false },
        ],

        desserts: [],

        editedIndex: -1,

        /*Aqui se deben cambiar los datos dependiendo el componente*/
        editedItem: {
            keyid: '',
            id: 0,
            nit: 0,
            nombre: 0,
            email: 0,
            telefono: 0,
            via: 0,
            vianum1: 0,
            vianum2: 0,
            vianum3: 0,
            ciudad: 0,
            departamento: 0,
            direccion: 0,
        },

        defaultItem: {
            name: '',
            id: 0,
            nit: 0,
            nombre: 0,
            email: 0,
            telefono: 0,
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
            return this.editedIndex === -1 ? 'Nuevo Proveedor' : 'Editar Proveedor'
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

                this.contadorProveedores.contadorid = doc.id;
                this.contadorProveedores.contador = doc.data().contadorProveedores;

                console.log("Contador", this.contadorProveedores.contador)
            })
        },

        //Esta función nos permite aumentar el contador 
        incrementarContador() {
            this.contadorProveedores.contador++;
            this.actualizarContador()
        },

        //Esta función permite actualizar el valor del contador en la base de datos
        async actualizarContador() {
            const Ref = doc(db, 'contadores', this.contadorProveedores.contadorid);
            await updateDoc(Ref, {
                contadorProveedores: this.contadorProveedores.contador
            })
        },

        /*Este es le metodo que nos permite agregar nuevos datos a firebase*/
        async crearRegistros() {
            const colRef = collection(db, 'proveedores')
            console.log(this.editedItem.name, this.editedItem.id, this.editedItem.nit, this.editedItem.nombre, this.editedItem.direccion,)
            const dataObj = {
                id: this.contadorProveedores.contador,
                nit: this.editedItem.nit,
                nombre: this.editedItem.nombre,
                telefono: this.editedItem.telefono,
                email: this.editedItem.email,
                via: this.editedItem.via.tipo,
                vianum1: this.editedItem.vianum1,
                vianum2: this.editedItem.vianum2,
                vianum3: this.editedItem.vianum3,
                departamento: this.editedItem.departamento.departamento,
                /*              ciudad: this.editedItem.ciudad.ciudad, */
                direccion: this.editedItem.via.tipo + ' ' + this.editedItem.vianum1 + ' # ' + this.editedItem.vianum2 + ' - ' + this.editedItem.vianum3 + " de " + this.editedItem.departamento.departamento,
            }
            await addDoc(colRef, dataObj);
            this.incrementarContador();
        },

        /*Este metodo Limpia la grilla tan pronto se crea un nuevo nit para evitar errores*/
        async limpiarCrud() {
            this.desserts = [];
        },

        /*Este metodo Elimina un documento de la base de datos guiandose por el id*/
        async eliminarDocumentos() {
            await deleteDoc(doc(db, "proveedores", this.editedItem.keyid));
        },

        /*Este metodo nos permite actualizar los datos en la base de datos */
        async actualizarDatos() {
            console.log(this.editedItem.keyid)
            const Ref = doc(db, "proveedores", this.editedItem.keyid);
            await updateDoc(Ref, {
                nombre: this.editedItem.nombre,
                telefono: this.editedItem.telefono,
                email: this.editedItem.email,
                via: this.editedItem.via,
                vianum1: this.editedItem.vianum1,
                vianum2: this.editedItem.vianum2,
                vianum3: this.editedItem.vianum3,
                departamento: this.editedItem.departamento,
                direccion: this.editedItem.via.tipo + ' ' + this.editedItem.vianum1 + ' # ' + this.editedItem.vianum2 + ' - ' + this.editedItem.vianum3 + " de " + this.editedItem.departamento.departamento,
            })
        },

        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
        async listarDatos() {
            const q = query(collection(db, "proveedores"));
            const resul = await getDocs(q);
            resul.forEach((doc) => {

                console.log("id", doc.id);
                this.desserts.push({
                    keyid: doc.id,
                    id: doc.data().id,
                    nit: doc.data().nit,
                    nombre: doc.data().nombre,
                    email: doc.data().email,
                    telefono: doc.data().telefono,
                    direccion: doc.data().direccion,
                    departamento: doc.data().departamento,
                    via: doc.data().via,
                    vianum1: doc.data().vianum1,
                    vianum2: doc.data().vianum2,
                    vianum3: doc.data().vianum3,
                })
            })
        },

        async imprimir() {
            let columns = [
                { title: "Nit", dataKey: "nit" },
                { title: "Nombre", dataKey: "nombre" },
                { title: "Email", dataKey: "email" },
                { title: "Telefono", dataKey: "telefono" },
                { title: "Direccion", dataKey: "direccion" },
            ];
            let registros = this.desserts;
            let doc = new jsPDF("p", "pt");
            doc.autoTable(columns, registros, {
                margin: { top: 60 },
                addPageContent: function () {
                    doc.setTextColor("#1A237E");
                    doc.text("Proveedores", 40, 30);
                },
            });
            doc.save("Proveedores.pdf");
        },


        initialize() {
            this.desserts = [


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

.headers {
    color: #1A237E;
}
</style>