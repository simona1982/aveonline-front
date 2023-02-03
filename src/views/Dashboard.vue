<template>
    <v-app id="inspire">
      <!-- NAVIGATION -->
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        clipped
        app
        dark
        :src="bg"
      >
        <!--v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title white--text">
              Categorias
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item-->
  
        <v-divider></v-divider>
  
        <v-list shaped>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            :to="{ name: item.name_route }"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- APP BAR -->
      <v-app-bar
        app
        dark
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        :color="color"
      >
        <div class="d-flex align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
                v-on="on"
              ></v-app-bar-nav-icon>
            </template>
            <span>Click</span>
          </v-tooltip>
          <v-toolbar-title>Aveonline</v-toolbar-title>
        </div>
  
        <v-spacer></v-spacer>
  
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon large v-on="on">
              <v-avatar size="32px" item>
                <v-img
                  :src="require('@/assets/images/profile.jpeg')"
                  alt="profile"
                ></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <span>Andrés Velásquez Delgado</span>
        </v-tooltip>
        <v-btn icon large @click="handleLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
  
      <!-- CONTENT -->
      <v-container fill-height>
        <router-view></router-view>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: "DashboardView",
    data: () => ({
      background: true,
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      dialog: false,
      drawer: null,
      items: [
        {
          icon: "mdi-hand-peace",
          text: "Bienvenida",
          name_route: "dashboard.welcome"
        },
        {
          icon: "mdi-account-group",
          text: "Usuarios",
          name_route: "dashboard.users"
        },
        {
          icon: "mdi-account-child-circle",
          text: "Roles",
          name_route: "dashboard.roles"
        },
        {
          icon: "mdi-bag-personal",
          text: "Productos",
          name_route: "dashboard.products"
        },
        {
          icon: "mdi-barcode-scan",
          text: "Ordenes",
          name_route: "dashboard.orders",
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' }
          ],
        }
      ]
    }),
    computed: {
      bg() {
        return this.background
          ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
          : undefined;
      }
    },
    created() {
      //this.$store.dispatch("getAllUsers");
      console.log("created");
    },
    methods: {
      handleLogout() {
        window.localStorage.removeItem("tokenUser");
        window.localStorage.removeItem("authUser");
        this.$router.push({ name: "login" });
      }
    }
  };
  </script>