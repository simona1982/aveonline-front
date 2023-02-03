<template>
      <v-row align="start" justify="center" color="red">
        <v-col xs="12" sm="12" md="4" lg="4" xl="4" class="ml-0">
            <v-img
                src="./../assets/images/avecolor.png"
                contain
            ></v-img>
        </v-col>
      </v-row>
  </template>
  
  <script>
//   import CategoryList from "./../components/categoy/CategoryList";
//   import UserList from "./../components/user/UserList";
  export default {
    name: "WelcomeView",
    //components: { CategoryList, UserList },
    created() {
    //   this.$store.dispatch("noUsers");
    }
  };
  </script>
  
  <style lang="scss" scoped></style>