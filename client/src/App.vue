<template>
  <div id="app">  
    <div class="mb-5 pt-5">
      <b-navbar toggleable="lg" type="dark" variant="primary" class="fixed-top">
        <img alt="Vue logo" src="./assets/node.svg" width="80" height="50" class="ml-5" >     
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
 
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <i class="fas fa-2x text-white fa-home" to="/"></i>
            <b-nav-item to="/">  <h5><strong> Home</strong></h5></b-nav-item>
            <i class="fas fa-2x text-white fa-store ml-4" to="/store"></i>
            <b-nav-item to="/store"> <h5><strong>Store</strong></h5></b-nav-item>
          </b-navbar-nav>

          <b-nabvar-nav class="ml-auto">
              <b-button variant="primary" to="/store">
                <i class="fas fa-3x fa-cart-plus text-success"></i>
                <b-badge variant="light">{{buys}}<span class="sr-only text-capitalize">unread messages</span></b-badge>
              </b-button>
          </b-nabvar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto mr-5 ">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content" ><em> <strong class="text-white"> {{client}}</strong></em></template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>    
    <router-view/>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
export default {
    data() {
      return {
        data:null,
      }
    },
    computed: mapGetters(['buys','client'])
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
