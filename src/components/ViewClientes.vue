<template>
    <v-container>
        <h1>Clientes</h1>
        <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
            <template v-slot:top>
                <v-toolbar class="crud-title" flat>
                    <v-toolbar-title>My CRUD</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn ccolor="white" dark class="mb-2" v-bind="props">
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
                                            <v-text-field v-model="editedItem.dni" label="dni"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.nombre" label="nombre"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.direccion" label="direccion"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedItem.telefono" label="telefono"></v-text-field>
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
                                    Añadir Nuevo Proveedor
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
            { title: 'Dni', key: 'dni' },
            { title: 'Nombre', key: 'nombre' },
            { title: 'Direccion', key: 'direccion' },
            { title: 'Email', key: 'email' },
            { title: 'Telefono', key: 'Telefono' },
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
            direccion: 0,
            email: 0,
            telefono: 0,
        },
        defaultItem: {
            name: '',
            id: 0,
            dni: 0,
            nombre: 0,
            direccion: 0,
            email: 0,
            telefono: 0,
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
            await deleteDoc(doc(db, "clientes", this.editedItem.keyid));

        },

        /*Este metodo Limpia la grilla tan pronto se crea un nuevo dni para evitar errores*/
        async limpiarCrud() {

            this.desserts = []

        }
        ,
        /*Este metodo nos permite actualizar los datos en la base de datos */
        async actualizarDatos() {
            console.log(this.editedItem.keyid)
            const Ref = doc(db, "clientes", this.editedItem.keyid);
            await updateDoc(Ref, {
                nombre: this.editedItem.nombre,
                telefono: this.editedItem.telefono,
                email: this.editedItem.email,
                direccion: this.editedItem.direccion,

            })

        },

        /*Este es le metodo que nos permite agregar nuevos datos a firebase*/

        async crearRegistros() {
            const colRef = collection(db, 'clientes')
            console.log(this.editedItem.name, this.editedItem.id, this.editedItem.dni, this.editedItem.nombre, this.editedItem.direccion,)
            const dataObj = {
                id: this.editedItem.id,
                dni: this.editedItem.dni,
                nombre: this.editedItem.nombre,
                direccion: this.editedItem.direccion,
                telefono: this.editedItem.telefono,
                email: this.editedItem.email,
            }
            const docRef = await addDoc(colRef, dataObj);
            console.log("Creo el dni con nombre", docRef.id);

        },

        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/

        async listarDatos() {

            const q = query(collection(db, "clientes"));
            const resul = await getDocs(q);
            resul.forEach((doc) => {

                console.log("id", doc.id);
                this.desserts.push({
                    keyid: doc.id,
                    id: doc.data().id,
                    dni: doc.data().dni,
                    nombre: doc.data().nombre,
                    direccion: doc.data().direccion,
                    email: doc.data().email,
                    telefono: doc.data().telefono,

                })

            })

        },


        initialize() {
            this.desserts = [
                /*         {
                
                          id: 2,
                          dni: "SaToPi",
                          nombre: 24,
                          direccion: "olis",
                        },
                        {
                
                          id: 3,
                          dni: "YK2",
                          nombre: "Carlos Jimenez",
                          direccion: "12345",
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
<style scoped>
.crud-title{
    background-color:#1A237E;
    color: white;
}



</style>