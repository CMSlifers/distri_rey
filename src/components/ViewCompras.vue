<template>
    <v-container class="contenedor">
        <div class="cambiarAnchoContador">
            <p class="texto-contador">Compra No. {{ contadorCompras.contador + 1 }}</p>
        </div>


        <v-card-text>

            <v-form>

                <div class="datosProveedor">

                    <v-container class="center">

                        <v-row>

                            <v-col cols="2">
                                <v-text-field class="font-weight-medium non-editable" readonly
                                    @click="$event.preventDefault()" ref="llenarNit" v-model="editedItem.nitProveedor"
                                    label="Nit Proveedor"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field class="font-weight-medium non-editable" readonly
                                    @click="$event.preventDefault()" ref="llenarNombre" v-model="editedItem.nombreProveedor"
                                    label="Proveedor"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="font-weight-medium non-editable" readonly
                                    @click="$event.preventDefault()" ref="llenartelefono"
                                    v-model="editedItem.telefonoProveedor" label="telefono"></v-text-field>
                            </v-col>

                            <v-dialog v-model="dialog" persistent width="1200">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="botonProveedor" @click="listarDatosProveedor" color="primary"
                                        v-bind="props" icon="mdi mdi-account-search">
                                    </v-btn>
                                </template>

                                <v-card class="crud-title">


                                    <v-card-title>
                                        Lista de Proveedores
                                        <v-spacer></v-spacer>
                                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Proveedor"
                                            single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-data-table :headers="headersProveedor" :items="dessertsProveedor" :search="search">
                                        <template v-slot:[`item.actions`]="{ item }">

                                            <v-icon class="mr-20" size="small" color="primary"
                                                @click="editItemProveedor(item.raw)">
                                                mdi mdi-plus-circle
                                            </v-icon>

                                        </template> </v-data-table>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="white" variant="text" @click="unirFunciones">
                                            Cerrar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>

                            </v-dialog>


                        </v-row>

                    </v-container>
                </div>

            </v-form>
        </v-card-text>

        <div class="superdiv">

        <v-row>
            <v-col cols="5">
        <v-card-text>

            <v-form v-if="mostrarFormProducto2" v-model="valid">
           <!--  <v-form> -->
                <div class="datosProductos">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="3">
                                    <v-text-field class="font-weight-medium non-editable" type="text"
                                        v-model="editedItem.codProducto" label="Código" ref="llenarCodigo"></v-text-field>
                                </v-col>

                                <v-col cols="7.5">
                                    <v-text-field class="font-weight-medium non-editable" type="text"
                                        v-model="editedItem.producto" label="Producto" ref="llenarProducto"></v-text-field>
                                </v-col>

                                <v-dialog v-model="dialog2" persistent width="1200">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="botonProducto" @click="listarDatosProductos" color="primary"
                                            v-bind="props" icon="mdi mdi-loupe">
                                        </v-btn>
                                    </template>

                                    <v-card class="crud-title">


                                        <v-card-title>
                                            Lista de Productos
                                            <v-spacer></v-spacer>
                                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Producto"
                                                single-line hide-details></v-text-field>
                                        </v-card-title>
                                        <v-data-table :headers="headersProductos" :items="dessertsProductos"
                                            :search="search">
                                            <template v-slot:[`item.actions`]="{ item }">

                                                <v-icon class="mr-20" size="small" color="primary"
                                                    @click="editItemProductos(item.raw)">
                                                    mdi mdi-plus-circle
                                                </v-icon>

                                            </template> </v-data-table>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="white" variant="text" @click="unirFunciones2">
                                                Cerrar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>

                                </v-dialog>

                            </v-row>

                            <v-row>
                                <v-col cols="3">
                                    <v-text-field class="editable" type="number" v-model="editedItem.cantidad"
                                        label="Cantidad"
                                        :rules="[v => !!v || 'Campo requerido', v => /^\d+$/.test(v) || 'Ingrese un número entero']">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="3">
                                    <v-text-field class="editable" type="number" v-model="editedItem.totalCompra"
                                        label="Total Compra" prefix="$"
                                        :rules="[v => !!v || 'Campo requerido', v => /^\d+(\.\d{1,2})?$/.test(v) || 'Formato incorrecto']">
                                    </v-text-field>
                                </v-col>


                                <v-col cols="3" sm="6" md="3">
                                    <v-text-field class="non-editable" type="number" v-model="editedItem.costoUnitario"
                                        :value="calculatedCostoUnitario" label="Costo Unitario" prefix="$"
                                        :rules="[v => !!v || 'Campo requerido', v => /^\d+(\.\d{1,2})?$/.test(v) || 'Formato incorrecto']">
                                    </v-text-field>
                                </v-col>



                                <v-col cols="3" sm="6" md="3">
                                    <v-text-field class="editable" type="number" v-model="editedItem.gasto" label="Gasto"
                                        prefix="$"
                                        :rules="[v => !!v || 'Campo requerido', v => /^\d+(\.\d{1,2})?$/.test(v) || 'Formato incorrecto']">
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12">
                                    <v-textarea class="editable" v-model="editedItem.observaciones"
                                        label="Observaciones"></v-textarea>
                                </v-col>


                            </v-row>

                            <v-btn class="btn-agregar" :disabled="!valid" variant="text"
                                @click="agregarCompra">Agregar</v-btn>

                        </v-container>

                    </v-card-text>
                </div>
            </v-form>
        </v-card-text>
    </v-col>

        <v-col cols="7">
        <v-card-text v-if="mostrarFormProducto3" v-model="valid">
            <div class="datosComprasDetalles">
            <v-container >
                <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]"
                    class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar color="primary" flat>
                            <v-toolbar-title>Productos</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog3" max-width="500px">
                                <template v-slot:activator="{ props }">
                                    <v-btn @click="imprimir" color="white" icon="mdi mdi-printer"
                                        title="Imprimir PDF"></v-btn>
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
                                        <v-form lazy-validation v-model="valid" ref="form">
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.cod"
                                                            label="Cod. Producto"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.nombre"
                                                            label="nombre Producto"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-combobox :rules="[v => !!v || 'Seleccione una categoria']"
                                                            required return-object auto-select-first="exact"
                                                            v-model="editedItem.catego" label="Categoria"
                                                            :items="datosCategoria" item-title="categoria">
                                                        </v-combobox>
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
                                            Añadir Nuevo Producto
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
        </div>
        </v-card-text>
    </v-col>
    </v-row>


</div>




        <v-form v-if="mostrarFormProducto">
            <v-container v-if="mostrarFormProveedor" class="center">
                <v-row>
                    <v-col cols="12" sm="2" md="4">
                        <v-text-field class="font-weight-medium" disabled ref="llenarCodigo"
                            v-model="editedItem.codProducto" label="Código de Producto"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field class="font-weight-medium" disabled ref="llenarProducto"
                            v-model="editedItem.nombreProveedor" label="Producto"></v-text-field>
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
                                </template>
                            </v-data-table>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="unirFunciones2">
                                    Cerrar
                                </v-btn>


                            </v-card-actions>
                        </v-card>

                    </v-dialog>

                </v-row>
            </v-container>
        </v-form>

        <v-form v-show="mostrarFormExtra" v-model="valid">
            <v-card-text>
                <v-container v-if="mostrarFormProveedor">
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field type="number" prefix="$" v-model="editedItem.precio"
                                :rules="[v => (v && v < this.guardarCantidadProducto || 'La cantidad no puede ser meyaor al número de existencias   ')]"
                                label="Precio"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field hint="Ingrese la cantidad a vender de este producto" :rules="cantidadRules"
                                requiered type="number" v-model="editedItem.cantidad" label="Cantidad"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-field label="Cantidad Disponible">{{ dessertsCantidadProducto }}</v-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field hint="Ingrese el descuento correspondiente si lo hay"
                                v-model="editedItem.descuento" label="Descuento"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field prefix="$" v-model="editedItem.valorTotal" label="Valor Total"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

        </v-form>

        <v-btn v-if="mostrarFormProveedor" @click="cambiarEstado()" ma="2">Guardar</v-btn>

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



        dialog: false,
        dialog2: false,
        dialogDelete: false,
        mostrarFormProveedor: false,
        mostrarFormProducto: false,
        mostrarFormProducto2: false,
        mostrarFormProducto3: false,
        mostrarFormExtra: false,
        search: '',
        contadorCompras: {
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
            { title: 'Id', key: 'id' },
            { title: 'Código de Producto', key: 'codProducto' },
            { title: 'Producto', key: 'producto' },
            { title: 'Precio', key: 'precio' },
            { title: 'Cantidad', key: 'cantidad' },
            { title: 'Descuento', key: 'descuento' },
            { title: 'Valor Total', key: 'valorTotal' },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        headersCompraDetalle: [
            {

                align: 'start',
                sortable: false,
                key: 'name',
            },
            { title: 'Id', key: 'id' },
            { title: 'ID Compra', key: 'idCompra' },
            { title: 'Nit', key: 'nit' },
            { title: 'Proveedor', key: 'proveedor' },
            { title: 'Telefono', key: 'telefono' },
            { title: 'Codigo Producto', key: 'codProducto' },
            { title: 'Producto', key: 'producto' },
            { title: 'Cantidad', key: 'cantidad' },
            { title: 'Total Compra', key: 'totalCompra' },
            { title: 'Costo Unitario', key: 'costoUnitario' },
            { title: 'Gastos', key: 'gastos' },
            { title: 'Observaciones', key: 'observaciones' },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        headersProveedor: [
            {
                align: 'start',
                key: 'name',
                sortable: false,
                /*      title: 'Dessert (100g serving)', */
            },
            /*   { title: 'Id', key: 'id' }, */
            { title: 'Nit', key: 'nit' },
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
        dessertsProveedor: [],
        dessertsProductos: [],
        dessertsCompraDetalle: [],
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
            nitProveedor: 0,
            nombreProveedor: 0,
            telefonoProveedor: 0,
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
            nitProveedor: 0,
            nombreProveedor: 0,
            telefonoProveedor: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Crear Compra' : 'Editar Compra'
        },

        calculatedCostoUnitario() {
            // Realiza el cálculo del costo unitario en función de la cantidad y el valor total de la compra
            return this.editedItem.totalCompra / this.editedItem.cantidad;
        },
        formattedCostoUnitario() {
            // Formatea el costo unitario con separadores de miles y dos decimales
            return this.editedItem.costoUnitario.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });
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
    },

    methods:
    {
        formatCurrency(value) {
            const formatter = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            return formatter.format(value);
        },

        agregarCompra() {
            // Formatea los campos de costo unitario, gasto y total compra antes de agregar la compra
            this.editedItem.costoUnitario = this.formatCurrency(this.editedItem.costoUnitario);
            this.editedItem.gasto = this.formatCurrency(this.editedItem.gasto);
            this.editedItem.totalCompra = this.formatCurrency(this.editedItem.totalCompra);

            // Resto de la lógica para agregar la compra
        },

        async unirFunciones2() {
            this.dialog2 = !this.dialog2;
            this.dessertsProductos = [];
        },
        async unirFunciones() {
            this.cambiarDialog();
            this.limpiarDessertClientes();
        },

        autoCompletarCamposProveedor() {
            let nitProveedorLet = this.dessertsProveedor[this.editedIndex].nit;
            this.$refs.llenarNit.value = nitProveedorLet;
            let nombreProveedorLet = this.dessertsProveedor[this.editedIndex].nombre;
            this.$refs.llenarNombre.value = nombreProveedorLet;
            let telefonoProveedorLet = this.dessertsProveedor[this.editedIndex].telefono;
            this.$refs.llenartelefono.value = telefonoProveedorLet;
            this.mostrarFormProducto2 = true;


        },
        autoCompletarCamposProductos() {
            let codProductoLet = this.dessertsProductos[this.editedIndex].codigo;
            this.$refs.llenarCodigo.value = codProductoLet;
            let productoLet = this.dessertsProductos[this.editedIndex].producto;
            this.$refs.llenarProducto.value = productoLet;
            let guardarCantidadProducto = this.dessertsProductos[this.editedIndex].cantidad;
            this.dessertsCantidadProducto = this.dessertsProductos[this.editedIndex].cantidad;

            /*        this.editedItem.nombreCliente = nombreClienteLet;
                this.editedItem.identificacionCliente = identificacionClienteLet; */
            return guardarCantidadProducto;
        },


        limpiarDessertClientes() {
            this.dessertsProveedor = [];
        },

        cambiarDialog() {
            this.dialog = false;
        },

        cambiarEstado() {
            this.llamarContador();
            this.mostrarFormProveedor = !this.mostrarFormProveedor;

        },

        async nuevoDetalleCompra() {
            const colRef = collection(db, 'comprasDetalles')
            const dataObj = {
                id: this.contadorProductos.contador,
                codProducto: this.editedItem.codProducto,
                producto: this.editedItem.producto,
                cantidad: this.editedItem.cantidad
            }
            await addDoc(colRef, dataObj);
            this.incrementarContador();
        },

        /* Con este metodo podemos mostrar los datos en la grilla trayendolos de la base de datos*/
        async listarDatosProveedor() {

            const queryClientes = query(collection(db, "proveedores"));
            const resulClientes = await getDocs(queryClientes);
            resulClientes.forEach((doc) => {

                console.log("id", doc.id);
                this.dessertsProveedor.push({
                    keyid: doc.id,
                    id: doc.data().id,
                    nit: doc.data().nit,
                    nombre: doc.data().nombre,
                    email: doc.data().email,
                    telefono: doc.data().telefono,
                    direccion: doc.data().direccion,
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
                });

            })
        },

        //Mediante esta función podemos llamar y guardar los datos del contador en nuestro objeto
        async llamarContador() {
            const contadorColRef = collection(db, 'contadores');
            const queryContador = query(contadorColRef);
            const datosContador = await getDocs(queryContador);
            datosContador.forEach((doc) => {
                this.contadorCompras.contadorid = doc.id;
                this.contadorCompras.contador = doc.data().contadorCompras;
            })

        },

        //Esta función nos permite aumentar el contador
        incrementarContador() {
            this.contadorCompras.contador++;
            this.actualizarContador()
        },

        //Esta función permite actualizar el valor del contador en la base de datos
        async actualizarContador() {
            const Ref = doc(db, "contadores", this.contadorCompras.contadorid);
            await updateDoc(Ref, {
                contadorCompras: this.contadorCompras.contador
            })

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

        editItemProveedor(item) {
            this.editedIndex = this.dessertsProveedor.indexOf(item)
            this.editedItemClientes = Object.assign({}, item)
            this.cambiarDialog();
            this.autoCompletarCamposProveedor();
            this.mostrarFormProducto = true;
            this.editedItemClientes = []
            this.limpiarDessertClientes();

        },
        editItemProductos(item) {
            this.editedIndex = this.dessertsProductos.indexOf(item)
            this.editedItemProductos = Object.assign({}, item)
            this.dialog2 = false;
            this.mostrarFormExtra = true;
            this.autoCompletarCamposProductos();
            this.mostrarFormProducto = true;
            this.mostrarFormProducto3 = true;
            this.editedItemClientes = []
            this.dessertsProductos = [];
            console.log(this.dessertsProductos)

        },
        editItem(item) {
            this.editedIndex = this.dessertsProveedor.indexOf(item)
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

.headers {
    color: #1A237E;
}

.cambiarAnchoContador {
    width: 100px;
/*     margin-left: 89%; */
    margin-left: 1%;
    color: red;
    text-align: center;
    /*bordes*/
    border: 1px solid #ccc;
    padding: 10px;
    width: 200px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(185, 163, 163, 0.3);

}

.datosProveedor {
    border: 0.5px solid #ccc;
    padding: 0px;
    margin-left: 0%;
    margin-right: 50%;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(185, 163, 163, 0.3);

}

.datosProductos {
    border: 0.5px solid #ccc;
    padding: 0px;
    margin-left: 0%;
   /*  margin-right: 50%; */
    background-color: #fff;
    box-shadow: 0 0 5px rgba(185, 163, 163, 0.3);
}

.datosComprasDetalles {
    border: 0.5px solid #ccc;
    padding: 0px;
    margin-left: 0%;
/*     margin-right: 50%; */
    background-color: #fff;
    box-shadow: 0 0 5px rgba(185, 163, 163, 0.3);
}


.botonProveedor {
    text-align: center;
    margin-inline: 2%;
    margin-top: 2%;

}

.botonProducto {
    text-align: center;
    margin-inline: 2%;
    margin-top: 2%;

}

.non-editable {
    pointer-events: none;
    background-color: transparent;
    color: #1A237E;
}

.editable {
    color: #1A237E;
}

.btn-agregar {
    color: #ffffff;
    background-color: #1A237E;
}




</style>