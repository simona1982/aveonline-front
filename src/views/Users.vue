<template>
    <v-card class="mx-auto">
      <!--v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        :items="allClients"
      </v-card-title-->
      <v-data-table
        :headers="headers"
        :items="users"
        sort-by="tradename"
        class="elevation-5"
        ref="vuetable"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>USUARIOS</v-toolbar-title>
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
                    Nuevo Usuario
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
                                md="6"
                            >
                                <v-text-field
                                    v-model="editedItem.nombre"
                                    label="Nombre"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="editedItem.login"
                                    label="Login"
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
                                    v-model="editedItem.clave"
                                    label="Clave"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-select
                                    v-model="editedItem.rol"
                                    :items="roles"
                                    item-text="nombre"
                                    item-value="id"
                                    label="Role"
                                    single-line
                                ></v-select>
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

            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Seguro que quieres eliminar este usuario?</v-card-title>
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
    name: "UsersView",
    data:() => ({
        dialog: false,
        dialogDelete: false,
        show1: false,
        select: {},
        headers: [
            {
                text: "Id Usuario",
                align: "left",
                sortable: false,
                value: "id"
            },
            { text: "Nombre", value: "nombre" },
            { text: "Login", value: "login" },
            { text: "Rol", sortable: false, value: "rol" },
            { text: 'Acciones', value: 'actions', sortable: false },
        ],
        users: [],
        roles: [],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            nombre: '',
            login: '',
            clave: '',
            rol: ''
        },
        defaultItem: {
            nombre: '',
            login: '',
            clave: '',
            rol: ''
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
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
        
        //Obtengo Usuarios
        fetch('http://aveonline-api.test/api/users', {
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
            this.users = response.data;
        });

        //Obtengo Roles
        fetch('http://aveonline-api.test/api/roles', {
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
            this.roles = response.data;
        });
    
    },
    methods: {
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
        deleteItemConfirm () {

            const token = JSON.parse(window.localStorage.getItem("tokenUser"));
            console.log(token);

            console.log(this.editedItem);
            

            fetch(`http://aveonline-api.test/api/user/${this.editedItem.id}`, {
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

                this.users.splice(this.editedIndex, 1)
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

                fetch(`http://aveonline-api.test/api/users/${this.editedItem.id}`, {
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
                    Object.assign(this.users[index], response.data)
            
                });
                
            } else {
                console.log(this.editedItem);

                const token = JSON.parse(window.localStorage.getItem("tokenUser"));
                console.log(token);

                fetch('http://aveonline-api.test/api/users', {
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
                    console.log(response);
                    this.users.push(response.data);
                });

            }
            
            this.close()
        },

    }
}
</script>