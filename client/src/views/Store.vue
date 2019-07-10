<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <h1>Make your purchases</h1>        
      </div>
    </div>
    <hr>
    <div v-if="items.length > 0">
      <div class="row" >
        <div class="table-responsive col-md">
          <table class="table .thead-dark">
            <thead>
              <tr >
                <th scope="col">Descripcion</th>
                <th scope="col">Precio - c/u</th>
                <th scope="col">Cantidad</th>
                <th scope="col"> Total Compra</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="producto in dCompra" :key="producto.idProducto">
                <td> {{ producto.descripcion }}  </td>
                <td> $ {{ producto.precio }} </td>
                <td> <input type="text" class="col-md-3" v-model="producto.cantidad"></td>
                <td> $ {{ producto.precio*producto.cantidad }} </td>
                <td>
                  <b-button pill variant="outline-info " @click="eliminarProducto(producto.idProducto)">
                    <i class="fas fa-2x text-danger fa-trash"></i>
                  </b-button> 
                </td>                  
              </tr>
            </tbody>

          </table>
        </div>      
      </div>
      
      <hr>

      <div class="row m-3 ">
        <div class="col-md text-right">
          <span class="badge badge-info mr-3 mb-3"><h4 class="">Total Compra: $ {{totalCompra}}</h4></span>
          <b-button pill
            variant="outline-success aling-left" 
            @click="realizarCompra()">
            <h5><strong>Realizar Compra <i class="fas fa-2x text-primary fa-shipping-fast"></i> </strong> </h5>
          </b-button>
        </div>
      </div>

    </div>
    <div v-else>
      <div class="row ">
        <div class="col-md">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">First add your products</h1>
              <p class="lead">This is a modified  that occupies the entire horizontal space of its parent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="this.$store.state.msg">
      <div class="col-md">
        <div class="jumbotron jumbotron-fluid bg-success">
            <div class="container">
              <h1 class="display-4 text-"><strong>!{{this.$store.state.msg}}¡ </strong> <i class="fas fa-2x text-light fa-hands-helping"></i></h1>
              <h3>Thank you for your purchase, come back soon</h3>
            </div>
          </div>
      </div>
    </div>
  </div>
  </template>

<script>
import { mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        data:null
      }
    },
    computed:{
    ...mapGetters(['dCompra','totalCompra', 'items'])
    },
    methods: {
      eliminarProducto(idProducto){
        this.$store.commit('eliminarProducto', idProducto)
      },
      ...mapActions(['realizarCompra']),
      ...mapMutations(['setCar'])
    },
  }
</script>