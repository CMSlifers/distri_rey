<template>
    <!-- AQUI INICIA TODO LO RELACIONADO CON BUSCAR EL CLIENTE-->
    <v-container>
        <div class="cambiarAnchoContador">
            <p v-if="mostrarFormCliente" class="texto-contador">Venta No.<v-field class="center" ref="spanContador">{{
                contadorVentas.contador }}</v-field></p>
        </div>

        <v-btn v-if="!mostrarFormCliente" @click="cambiarEstado()">Añadir Venta</v-btn>

        <v-card-text>
            <v-form v-if="mostrarFormCliente">

                <v-container class="center ">

                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field class="font-weight-medium non-editable" @click="$event.preventDefault()"
                                ref="llenarIdentificacion" v-model="editedItem.identificacion"
                                label="Identificación Cliente"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field class="font-weight-medium non-editable" @click="$event.preventDefault()"
                                ref="llenarNombre" v-model="editedItem.cliente" label="Cliente"></v-text-field>
                        </v-col>

                        <v-dialog v-model="dialog" persistent width="1024">
                            <template v-slot:activator="{ props }">
                                <v-btn @click="listarDatosClientes" title="Buscar Cliente" color="primary" v-bind="props"
                                    icon="mdi mdi-account-search">

                                </v-btn>
                            </template>
                            <v-card class="crud-title">


                                <v-card-title>
                                    Listar Cliente
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Cliente"
                                        single-line hide-details></v-text-field>
                                </v-card-title>
                                <v-data-table :headers="headersClientes" :items="dessertsClientes" :search="search">
                                    <template v-slot:[`item.actions`]="{ item }">
                                        <v-icon class="mr-20" size="small" color="primary"
                                            @click="editItemClientes(item.raw)">
                                            mdi mdi-plus-circle
                                        </v-icon>
                                    </template> </v-data-table>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="white" variant="text" @click="unirFunciones">
                                        Close
                                    </v-btn>


                                </v-card-actions>
                            </v-card>

                        </v-dialog>

                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <!-- AQUI tERMINA TODO LO RELACIONADO CON BUSCAR EL CLIENTE-->

        <!-- AQUI INICIA TODO LO RELACIONADO CON EL LLAMADO DE LOS PRODUCTOS-->

        <v-form v-if="mostrarFormProducto">
            <v-container v-if="mostrarFormCliente" class="center">
                <v-row>
                    <v-col cols="12" sm="2" md="4">
                        <v-text-field class="font-weight-medium non-editable" @click="$event.preventDefault()"
                            ref="llenarCodigo" v-model="editedItem.codProducto" label="Código de Producto"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field class="font-weight-medium non-editable" @click="$event.preventDefault()"
                            ref="llenarProducto" v-model="editedItem.cliente" label="Producto"></v-text-field>
                    </v-col>

                    <v-dialog v-model="dialog2" persistent width="1024">
                        <template v-slot:activator="{ props }">
                            <v-btn @click="listarDatosProductos" color="primary" v-bind="props" icon="mdi mdi-tag-plus">

                            </v-btn>
                        </template>
                        <v-card class="crud-title">


                            <v-card-title>
                                Listar Producto
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                                    hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table :headers="headersProductos" :items="dessertsProductos" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-icon size="small" color="primary" @click="editItemProductos(item.raw)">
                                        mdi mdi-plus-circle
                                    </v-icon>
                                </template> </v-data-table>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="unirFunciones2">
                                    Close
                                </v-btn>


                            </v-card-actions>
                        </v-card>

                    </v-dialog>

                </v-row>
            </v-container>
        </v-form>
        <v-form v-show="mostrarFormExtra" v-model="valid">
            <v-card-text>
                <v-container class=" center" v-if="mostrarFormCliente">
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field class="font-weight-medium non-editable" readonly prefix="$"
                                v-model="editedItem.precio" ref="precio" label="Precio"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field v-on:change="calcularValorTotal"
                                hint="Ingrese la cantidad a vender de este producto"
                                :rules="[
                                    v => !!v || 'Se requiere especificar una cantidad',
                                    v => (v && v >= 1) || 'La cantidad no puede ser menor a 1   ',
                                    v => (v && v <= dessertsCantidadProducto || 'La cantidad no puede ser mayor al número de existencias   ')]" requiered type="number"
                                v-model="editedItem.cantidad" label="Cantidad"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-field label="Cantidad Disponible">{{ dessertsCantidadProducto }} </v-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field v-on:change="calcularValorTotalDescuento" :rules="[

                                v => (v >= 0) || 'La cantidad no puede ser menor a 0',]"
                                hint="Ingrese el descuento correspondiente si lo hay" type="number"
                                v-model="editedItem.descuento" label="Descuento (%)" suffix="%"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field class="non-editable" prefix="$" v-model="editedItem.valorTotal" ref="valorTotal"
                                label="Valor Total"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-btn :disabled="!valid" color="blue-darken-1" variant="text" @click="agregarProductoVenta()">
                Agregar
            </v-btn>
        </v-form>
        <!-- AQUI TERMINA TODO LO RELACIONADO CON EL LLAMADO DE LOS PRODUCTOS-->


        <!-- ESTE ES EL BOTON DE GUARDAR-->
        <v-btn v-show="mostrarBotonGuardar" @click="cambiarEstadoContador()" ma="2">Guardar</v-btn>


        <!-- AQUI INICIA TODO LO RELACIONADO CON EL CRUD GENERAL-->

        <v-container v-show="mostrarCrudGeneral">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1"
                :search="search">
                <template v-slot:top>
                    <v-toolbar color="primary" flat>
                        <v-toolbar-title>Productos</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn @click="imprimir" color="white" icon="mdi mdi-printer" title="Imprimir PDF"></v-btn>
                    </v-toolbar>

                </template>


            </v-data-table>
        </v-container>
        <!-- AQUI TERMINA TODO LO RELACIONADO CON EL CRUD GENERAL-->
    </v-container>
</template>
<script>
import db from '../firebase/init.js'
import { collection, getDocs, query, updateDoc, doc, addDoc } from 'firebase/firestore'
export default {
    data: () => ({
        valid: true,
        cantidadRules: [
            v => !!v || 'Se requiere especificar una cantidad',
            v => (v && v >= 1) || 'La cantidad no puede ser menor a 1   ',

        ],
        keyIdProducto:[],
        dialog: false,
        dialog2: false,
        dialogDelete: false,
        mostrarCrudGeneral: true,
        mostrarFormCliente: false,
        mostrarFormProducto: false,
        mostrarFormExtra: false,
        mostrarBotonGuardar: false,
        search: '',
        contadorVentas: {
            contador: 0,
            contadorid: 0
        },
        headers: [
            {
                /*  title: 'Dessert (100g serving)' ,*/
                align: 'start',
                sortable: false,
                key: 'name',
            },
            { title: 'N. Venta', key: 'id' },
            { title: 'Código de Producto', key: 'codProducto' },
            { title: 'Producto', key: 'producto' },
            { title: 'Identificación', key: 'identificacion' },
            { title: 'Nombre', key: 'cliente' },
            { title: 'Precio', key: 'precio' },
            { title: 'Cantidad', key: 'cantidad' },
            { title: 'Descuento (%)', key: 'descuento' },
            { title: 'Valor Total', key: 'valorTotal' },

        ],
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
        headersProductos: [
            {
                /* title: 'Dessert (100g serving)' */
                align: 'start',
                sortable: false,
                key: 'name',
            },
            { title: 'Id', key: 'id' },
            { title: 'Codigo', key: 'codigo' },
            { title: 'Producto', key: 'producto' },
            { title: 'Categoria', key: 'categoria' },
            { title: 'Cantidad', key: 'cantidad' },
            { title: 'Actions', key: 'actions' },
        ],
        desserts: [],
        dessertsCantidadProducto: [],
        dessertsClientes: [],
        dessertsProductos: [],
        dessertsCrudGeneral: [],
        editedIndex: -1,
        editedItem: {
            keyid: '',
            id: 0,
            codProducto: 0,
            producto: 0,
            precio: 0,
            cantidad: 0,
            descuento: 0,
            valorTotal: 0,
            identificacion: 0,
            cliente: 0,
        },
        editedItem2: {
            keyid: '',
            id: 0,
            codProducto: 0,
            producto: 0,
            precio: 0,
            cantidad: 0,
            descuento: 0,
            valorTotal: 0,
            identificacion: 0,
            cliente: 0,
        },
        defaultItem: {
            keyid: '',
            id: 0,
            codProducto: 0,
            producto: 0,
            precio: 0,
            cantidad: 0,
            descuento: 0,
            valorTotal: 0,
            identificacion: 0,
            cliente: 0,
        },
        precioUnitario: [],
        totalSinDescuento: []
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Crear Venta' : 'Editar Venta'
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
        this.initialize()
        this.listarDatosCrudGeneral()
    },

    methods:
    {
        complementoAgregarProductoVenta() {
            this.mostrarBotonGuardar = true
            this.editedItem = [];
/*             this.actualizarDatosCantidad() */
            this.desserts = [];
            this.listarDatosCrudGeneral();
            this.mostrarCrudGeneral = true;
            this.mostrarFormExtra = false;
            
        },

        /*Este es le metodo que nos permite agregar nuevos datos a firebase*/
        async agregarProductoVenta() {
            console.log(this.editedItem)

            const colRef = collection(db, 'ventas')
            const dataObj = {
                id: this.contadorVentas.contador,
                identificacion: this.editedItem2.identificacion,
                cliente: this.editedItem2.cliente,
                codProducto: this.editedItem2.codProducto,
                producto: this.editedItem2.producto,
                cantidad: this.editedItem.cantidad,
                descuento: this.editedItem.descuento,
                precio: this.editedItem.precio,
                valorTotal: this.editedItem2.valorTotal,
            }
            const docRef = await addDoc(colRef, dataObj);
            console.log("Creo el usuario con nombre", docRef.id);
            this.complementoAgregarProductoVenta()
        },


        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
        async listarDatosCrudGeneral() {
            const q = query(collection(db, "ventas"));
            const resul = await getDocs(q);
            resul.forEach((doc) => {
                this.desserts.push({
                    keyid: doc.id,
                    id: doc.data().id,
                    identificacion: doc.data().identificacion,
                    cliente: doc.data().cliente,
                    codProducto: doc.data().codProducto,
                    producto: doc.data().producto,
                    cantidad: doc.data().cantidad,
                    descuento: doc.data().descuento,
                    precio: doc.data().precio,
                    valorTotal: doc.data().valorTotal,
                })


            });
        },

        async unirFunciones2() {
            this.dialog2 = !this.dialog2;
            this.dessertsProductos = [];
        },
        async unirFunciones() {
            this.cambiarDialog();
            this.limpiarDessertClientes();
        },

        async autoCompletarCamposClientes() {
            let identificacionLet = this.dessertsClientes[this.editedIndex].identificacion;
            this.editedItem2.identificacion = identificacionLet
            this.$refs.llenarIdentificacion.value = identificacionLet;
            let clienteLet = this.dessertsClientes[this.editedIndex].nombre;
            this.$refs.llenarNombre.value = clienteLet;
            this.editedItem2.cliente = clienteLet




            /*        this.editedItem.cliente = clienteLet;
                this.editedItem.identificacion = identificacionLet; */
        },

        async autoCompletarCamposProductos() {
            let codProductoLet = this.dessertsProductos[this.editedIndex].codigo;
            this.$refs.llenarCodigo.value = codProductoLet;
            this.editedItem2.codProducto = codProductoLet
            let productoLet = this.dessertsProductos[this.editedIndex].producto;
            this.$refs.llenarProducto.value = productoLet;
            this.editedItem2.producto = productoLet

            let guardarCantidadProducto = this.dessertsProductos[this.editedIndex].cantidad;
            this.dessertsCantidadProducto = this.dessertsProductos[this.editedIndex].cantidad;
            let precioUnitarioLet = this.dessertsProductos[this.editedIndex].precio;
            this.$refs.precio.value = precioUnitarioLet;
            this.precioUnitario = precioUnitarioLet
            this.editedItem.precio = precioUnitarioLet

            return guardarCantidadProducto;
        },



        limpiarDessertClientes() {
            this.dessertsClientes = [];
        },

        cambiarDialog() {
            this.dialog = false;
        },
        cambiarEstadoContador() {
            this.incrementarContador()
            this.mostrarFormCliente = !this.mostrarFormCliente;
            this.mostrarCrudGeneral = false;
            this.mostrarCrudGeneral = true;
            this.mostrarBotonGuardar = !this.mostrarBotonGuardar;
        },

        cambiarEstado() {
            this.llamarContador();
            this.mostrarFormCliente = !this.mostrarFormCliente;
            this.mostrarCrudGeneral = false
        },


        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
        async listarDatosClientes() {

            const queryClientes = query(collection(db, "clientes"));
            const resulClientes = await getDocs(queryClientes);
            resulClientes.forEach((doc) => {

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

        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
        async listarDatosProductos() {

            const queryProductos = query(collection(db, "productos"));
            const resulProductos = await getDocs(queryProductos);
            resulProductos.forEach((doc) => {

                console.log("id", doc.id);

                this.dessertsProductos.push({
                    keyid: doc.id,
                    id: doc.data().id,
                    codigo: doc.data().codigo,
                    producto: doc.data().producto,
                    categoria: doc.data().categoria,
                    cantidad: doc.data().cantidad,
                    precio: doc.data().precio,
                });

            })
        },

        /*Este metodo nos permite actualizar los datos en la base de datos */
        async actualizarDatosCantidad() {
            let actualizarCantidadLet = this.desserts.cantidad - this.editedItem.cantidad
            console.log(this.editedItem.keyid)
            const Ref = doc(db, "productos", this.keyIdProducto);
            await updateDoc(Ref, {
                
                cantidad: actualizarCantidadLet ,
            })
        },

        //Mediante esta función podemos llamar y guardar los datos del contador en nuestro objeto
        async llamarContador() {
            const contadorColRef = collection(db, 'contadores');
            const queryContador = query(contadorColRef);
            const datosContador = await getDocs(queryContador);
            datosContador.forEach((doc) => {
                this.contadorVentas.contadorid = doc.id;
                this.contadorVentas.contador = doc.data().contadorVentas;
            })

        },

        //Esta función nos permite aumentar el contador
        incrementarContador() {
            this.contadorVentas.contador++;
            this.actualizarContador()
        },

        //Esta función permite actualizar el valor del contador en la base de datos
        async actualizarContador() {
            const Ref = doc(db, "contadores", this.contadorVentas.contadorid);
            await updateDoc(Ref, {
                contadorVentas: this.contadorVentas.contador
            })

        },

        async calcularValorTotal() {

            let valorTotalFinal = this.precioUnitario * this.editedItem.cantidad;
            this.$refs.valorTotal.value = valorTotalFinal;
            this.totalSinDescuento = valorTotalFinal
            this.calcularValorTotalDescuento()


            return valorTotalFinal
        },
        async calcularValorTotalDescuento() {

            let valorTotalFinalDescuento = this.totalSinDescuento - (this.totalSinDescuento * (this.editedItem.descuento / 100));
            this.$refs.valorTotal.value = valorTotalFinalDescuento;
            this.editedItem2.valorTotal = valorTotalFinalDescuento

            return valorTotalFinalDescuento
        },


        initialize() {
            this.desserts = [
                /*                 {
                                    id: 0,
                                    codProducto: 0,
                                    producto: 0,
                                    precio: 0,
                                    cantidad: 0,
                                    descuento: 0,
                                    valorTotal: 0,
                                }, */
            ]
        },

        editItemClientes(item) {
            this.editedIndex = this.dessertsClientes.indexOf(item)
            this.editedItemClientes = Object.assign({}, item)
            this.cambiarDialog();
            this.autoCompletarCamposClientes();
            this.mostrarFormProducto = true;
            this.editedItemClientes = []
            this.limpiarDessertClientes();

        },
        editItemProductos(item) {
            this.editedIndex = this.dessertsProductos.indexOf(item)
            this.keyIdProducto = this.dessertsProductos.indexOf(item).keyid
            this.editedItemProductos = Object.assign({}, item)
            this.dialog2 = false;
            this.mostrarFormExtra = true;
            this.autoCompletarCamposProductos();
            this.mostrarFormProducto = true;
            this.editedItemClientes = []
            this.dessertsProductos = [];
            console.log(this.dessertsProductos)

        },
        editItem(item) {
            this.editedIndex = this.dessertsClientes.indexOf(item)
            this.editedItemClientes = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
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
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
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


.cambiarAnchoContador {
    width: 100px;
    margin-left: 85%;
    color: red;
    text-align: center;
}

.non-editable {
    pointer-events: none;
    background-color: transparent;
    color: #1A237E;
}

.bordeContenedor {
    border: 0.5px solid #ccc;

    background-color: #fff;
    box-shadow: 0 0 5px rgba(185, 163, 163, 0.3);

}
</style>