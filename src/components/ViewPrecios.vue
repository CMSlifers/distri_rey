<template>
    <container>
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn @click="listarDatos" color="primary" v-bind="props">
                    Open Dialog
                </v-btn>
            </template>
            <v-card>


                <v-card-title>
                    Nutrition
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                        hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headersClientes" :items="dessertsClientes" :search="search">
                    <template v-slot:[`item.actions`]>
                        <v-icon size="small" color="primary" class="me-2" @click="mostrarForm">
                            mdi-plus-circle-outline
                        </v-icon>
                    </template> </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Save
                    </v-btn>

                </v-card-actions>
            </v-card>

        </v-dialog>


    </container>
</template>
<script>
import db from '../firebase/init.js'
import { collection, getDocs, query } from 'firebase/firestore'

export default {
    data() {
        return {
            dialog: false,
            search: '',
            headersClientes: [
                {
                    align: 'start',
                    key: 'name',
                    sortable: false,
                    /*      title: 'Dessert (100g serving)', */
                },
                { title: 'Id', key: 'id' },
                { title: 'Identificación', key: 'identificacion' },
                { title: 'Nombre', key: 'nombre' },
                { title: 'Email', key: 'email' },
                { title: 'Telefono', key: 'telefono' },
                { title: 'Direccion', key: 'direccion' },
                { title: 'Acciones', key: 'actions' },
            ],
            desserts: [],
            dessertsClientes: [],
        }
    },
    methods: {
        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
        async listarDatos() {

            const q = query(collection(db, "clientes"));
            const resul = await getDocs(q);
            resul.forEach((doc) => {

                console.log("id", doc.id);
                this.dessertsClientes.push({
                    keyid: doc.id,
                    id: doc.data().id,
                    identificacion: doc.data().identificacion,
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
        unirFunciones() {
            this.limpiarDessertClientes;
            this.cambiarDialog();
        },

        limpiarDessertClientes() {
            this.dessertsClientes = [];
        },

        cambiarDialog() {
            this.dialog = false;
        },
    }
}
</script>