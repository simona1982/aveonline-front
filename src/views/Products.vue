<template>
    <v-card class="mx-auto">
      <v-data-table
        :headers="headers"
        :items="products"
        sort-by="nombre"
        class="elevation-5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>PRODUCTOS</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                    Nuevo Producto
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="12"
                            >
                                <v-text-field
                                    v-model="editedItem.nombre"
                                    label="Nombre"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="editedItem.precio_unidad"
                                    label="Precio Unitario"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="editedItem.numero_existencias"
                                    label="Numero Existencias"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-textarea
                                    v-model="editedItem.descripcion"
                                    outlined
                                    rows="3"
                                    row-height="15"
                                    name="descripcion"
                                    label="Descripcion"
                                    hint="Descripción Producto"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="600px">
                <v-card>
                    <v-card-title class="text-h5">Seguro que quieres eliminar este producto?</v-card-title>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
            <v-btn
                color="primary"
            >
                Reset
            </v-btn>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
    name: "RolesView",
    data:() => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: "Id Producto",
                align: "left",
                sortable: false,
                value: "id"
            },
            { text: "Nombre", value: "nombre" },
            { text: "Descripcion", value: "descripcion" },
            { text: "Precio Unitario", value: "precio_unidad" },
            { text: "Numero de Existencia", value: "numero_existencias" },
            { text: 'Acciones', value: 'actions', sortable: false }
        ],
        products: [],
        editedIndex: -1,
        editedItem: {
            nombre: '',
            descripcion: '',
            precio_unidad: '',
            numero_existencias: ''
        },
        defaultItem: {
            nombre: '',
            descripcion: '',
            precio_unidad: '',
            numero_existencias: ''
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nuevo Producto" : "Editar Producto";
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created() {
        const token = JSON.parse(window.localStorage.getItem("tokenUser"));
        console.log(token);
      
        fetch('http://aveonline-api.test/api/products', {
            method: 'GET', // or 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token.access_token,
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            this.products = response.data;
        });
    
    },
    methods: {
        editItem (item) {
            this.editedIndex = this.products.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            this.editedIndex = this.products.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            });
        },
        deleteItemConfirm () {
            const token = JSON.parse(window.localStorage.getItem("tokenUser"));
            console.log(token);

            console.log(this.editedItem);


            fetch(`http://aveonline-api.test/api/product/${this.editedItem.id}`, {
                method: 'DELETE', // or 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ token.access_token,
                }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response);

                this.products.splice(this.editedIndex, 1)
                this.closeDelete()
            });


        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            });
        },
        save () {

            //Editar
            if (this.editedIndex > -1) {

                let index = this.editedIndex;

                const token = JSON.parse(window.localStorage.getItem("tokenUser"));
                console.log(token);

                fetch(`http://aveonline-api.test/api/product/${this.editedItem.id}`, {
                    method: 'PUT', // or 'PUT'
                    body: JSON.stringify(this.editedItem), // data can be `string` or {object}!
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+ token.access_token
                    }
                }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    Object.assign(this.products[index], response.data)
            
                });

            } else {
                console.log(this.editedItem);

                const token = JSON.parse(window.localStorage.getItem("tokenUser"));
                console.log(token);

                fetch('http://aveonline-api.test/api/products', {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(this.editedItem), // data can be `string` or {object}!
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+ token.access_token
                    }
                }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    this.products.push(response.data);
                });

            }
            
            this.close()
        }
    }
}
</script>