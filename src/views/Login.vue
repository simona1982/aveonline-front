<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">

                <v-card elevation="16" class="mx-auto">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer />
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                            <a
                                href="https://aveonline.co/"
                                target="_blank"
                                v-on="on"
                            >
                                <img
                                    src="./../assets/images/avecolor.png"
                                    alt="aveonline"
                                    class="img-aveonline"
                                />
                            </a>
                            </template>
                            <span>Aveonline</span>
                        </v-tooltip>
                    </v-toolbar>

                    <v-card-text>
                        <v-row align="center" justify="center" class="mb-10 pa-4">
                            <v-img
                                contain
                                src="./../assets/images/avecolor.png"
                                width="400"
                                height="104"
                            ></v-img>
                        </v-row>

                        <v-form ref="form_login">
                            <v-text-field
                                v-model="login.login"
                                label="Email"
                                name="email"
                                prepend-icon="mdi-account"
                                clearable
                                type="text"
                            />

                            <v-text-field
                                v-model="login.clave"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                clearable
                                type="password"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <!--v-spacer /-->
                        <v-row align="center" justify="center" class="pa-6">
                            <v-btn
                                color="primary"
                                x-large
                                rounded
                                @click.prevent="handleLoginFormSubmit"
                            >
                            <v-icon left>
                                mdi-lock-open
                            </v-icon>Login
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>  
</template>
  
  <script>
  // @ is an alias to /src
  
  export default {
    name: 'LoginView',
    data: () => ({
        login: {
            login: "administrador",
            clave: "password"
        }
    }),
    methods: {
        handleLoginFormSubmit: function() {
            
            const postData = {
                login: this.login.login,
                clave: this.login.clave
            };

            fetch('http://aveonline-api.test/api/login', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(postData), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => {
                console.error('Error:', error)
                //this.$router.push({ path: "/login" });
            })
            .then(response => {

                if(response.error) {
                    console.log(response.msg);
                    return true;
                }else {
                    console.log('Success:', response)
                    localStorage.setItem("tokenUser", JSON.stringify(response));
                    
                    fetch('http://aveonline-api.test/api/profile', {
                        method: 'POST', // or 'PUT',
                        headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer '+ response.access_token, 
                        }
                    })
                    .then(res1 => res1.json())
                    .catch(error => {
                        console.error('Error:', error)
                        //this.$router.push({ path: "/login" });
                    })
                    .then(response1 => {
                        localStorage.setItem("authUser", JSON.stringify(response1));
                        this.$router.push({ path: "/dashboard" });
                    });
                }
            });
        }
    }
  }
  </script>

<style>
.img-aveonline {
    width: 200px;
    height: 52px;
}
</style>
  