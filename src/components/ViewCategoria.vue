<template>
    <v-container>

        <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
            <template v-slot:top>
                <v-toolbar class="crud-title" flat>
                    <v-toolbar-title>Categorias</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn @click="llamarContador" color="white" dark class="mb-2" v-bind="props">
                                Nueva Categoria
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>

                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.categoria" label="categoria"></v-text-field>
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
                                    Añadir Nueva Categoria
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">¿Seguro desea eliminar esta Categoria?</v-card-title>
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

export default {
    data: () => ({
        contadorCategorias: [],

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
            { title: 'Categoria', key: 'categoria' },
            { title: 'Actions', key: 'actions' },

        ],
        desserts: [],
        editedIndex: -1,
        /*Aqui se deben cambiar los datos dependiendo el componente*/
        editedItem: {
            keyid: '',
            id: 0,
            categoria: 0,

        },
        defaultItem: {
            name: '',
            id: 0,
            categoria: 0,

        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Nueva Categoria' : 'Editar Categoria'
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

        //Mediante esta función podemos llamar y guardar los datos del contador en nuestro objeto 
        async llamarContador() {
            const contadorColRef = collection(db, 'contadores');
            const queryContador = query(contadorColRef);
            const datosContador = getDocs(queryContador);
            (await datosContador).forEach((doc) => {
                this.contadorCategorias.contadorid = doc.id,
                    this.contadorCategorias.contador = doc.data().contadorCategorias
            })
        },

        //Esta función nos permite aumentar el contador 
        incrementarContador() {
            this.contadorCategorias.contador++;
            this.actualizarContador();
        },

        //Esta función permite actualizar el valor del contador en la base de datos
        async actualizarContador() {
            const Ref = doc(db, 'contadores', this.contadorCategorias.contadorid);
            await updateDoc(Ref, {
                contadorCategorias: this.contadorCategorias.contador
            })
        },

        /*Este es le metodo que nos permite agregar nuevos datos a firebase*/
        async crearRegistros() {
            const colRef = collection(db, 'categoria')
            console.log(this.editedItem.name, this.editedItem.id, this.editedItem.categoria)
            const dataObj = {
                id: this.contadorCategorias.contador,
                categoria: this.editedItem.categoria,
            }
            await addDoc(colRef, dataObj);
            this.incrementarContador();
        },

        /*Este metodo Limpia la grilla tan pronto se crea un nuevo categoria para evitar errores*/
        async limpiarCrud() {
            this.desserts = []
        },

        /*Este metodo Elimina un documento de la base de datos guiandose por el id*/
        async eliminarDocumentos() {
            await deleteDoc(doc(db, "categoria", this.editedItem.keyid));
        },

        /*Este metodo nos permite actualizar los datos en la base de datos */
        async actualizarDatos() {
            console.log(this.editedItem.keyid)
            const Ref = doc(db, "categoria", this.editedItem.keyid);
            await updateDoc(Ref, {
                categoria: this.editedItem.categoria,
            })
        },

        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
        async listarDatos() {
            const q = query(collection(db, "categoria"));
            const resul = await getDocs(q);
            resul.forEach((doc) => {
                this.desserts.push({
                    keyid: doc.id,
                    id: doc.data().id,
                    categoria: doc.data().categoria,
                })
            })
        },

        initialize() {
            this.desserts = [
                /*         {
                
                          id: 2,
                          categoria: "SaToPi",

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
                this.actualizarDatos()
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
    