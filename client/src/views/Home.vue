<template>
  <div class="home m-4"> 
      <h2> <strong>Welcome to NodeStore!</strong></h2>
    <hr>
    <div class="container">
      <div class="row">
        <b-form inline @submit.prevent="findClient" >
          <i class="fas fa-2x text-primary fa-user mr-2"></i>
          <label class="sr-only" for="inline-form-input-cedula"> </label>
          <b-input id="inline-form-input-cedula" class="mb-2 mr-sm-2 mb-sm-0 " v-model="Cedula" placeholder="denfication" required></b-input>
          <b-button type="submit" variant="primary" @click="findClient">Search  <i class="fas fa-2x fa-search"></i> </b-button>
          <label class="sr-only" for="inline-form-input-cedula"></label>
        </b-form>
      </div>

      <div v-if="datos" >
        <div class="row">
          <div class="mt-2 col-md-5">
            <b-card bg-variant="primary" text-variant="white" class="text-center">
              Mostrar información Cliente:
              <b-button v-b-toggle.collapse-1 variant="success" size="sm" class="">
                <i class="fas fa-2x fa-user-check text-primary"></i> {{ datos.idCliente}}
              </b-button>
            </b-card>             
          </div>

          <div class="col-md-6"> 
            <b-collapse id="collapse-1" class="mt-2 mb-2">
              <b-list-group>
                <b-list-group-item><strong>Nombres</strong>: {{datos.primernombre }} {{ datos.segundonombre}} </b-list-group-item>
                <b-list-group-item><strong>Apellidos</strong>: {{datos.primerapellido}} {{ datos.segundoapellido}}</b-list-group-item>
                <b-list-group-item><strong>Telefono</strong>: {{datos.telefono}}</b-list-group-item>
                <b-list-group-item><strong>Dirección</strong>: {{ datos.direccion}}</b-list-group-item>
              </b-list-group>
            </b-collapse>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
              <h4 class="text-center"><strong>Buy Products !</strong></h4>
              <hr>
          </div>
        </div>

        <div class="row">
          <div v-for="product in products" :key="product.idProducto" class="mt-2 col-md-3 ">
            <b-card :title=product.descripcion   style="max-width: 20rem;" bg-variant="info" text-variant="light"  border-variant="primary" header-border-variant="primary">
            <hr>
              <b-card-text >                                 
                  <h3 class="text-center"><i class="fas fa-dollar-sign text-warning "> </i> {{ product.precio}} </h3>
                  <b-button pill
                    variant="outline-light aling-left"  class="align-text-bottom"
                    @click="aggCar(product.idProducto, product.descripcion, product.precio, product.cantidadExistencia)">
                    <h5 class="text-right">Add Car <i class="fas fa-2x fa-plus-circle text-primary "></i> </h5>
                  </b-button>                              
              </b-card-text>
            </b-card>
          </div>
        </div>

      </div>
    </div>
  </div>  
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2'
import {mapMutations, mapGetters, mapState} from 'vuex';

export default {
  name: 'home',
  data(){
    return{
      Cedula:null,
      cantidad: 0  

    }
  },
  created(){
    
  },
  computed:{
    ...mapGetters(['datos','products'])
  },
  methods:{
    async findClient(){
      await axios.get(`http://localhost:9000/store/client/${this.Cedula}`).then(async (value) => {
        this.$store.state.data =value.data
        if(!this.$store.state.data){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Entry your Client Or not Exists!',
          })
          this.$store.commit('setCar')
        }else{
          this.$store.commit('setCar')//cada ves que hacemos una busqueda reiniciamos el carrito
          this.findProducts() //trae toodos los productos
        }
      }) 
    },

    async findProducts(){
      await axios.get('http://localhost:9000/store/products').then((value) => {
        this.$store.state.products = value.data
      })
    },
    
    aggCar(idProducto, descripcion, precio ){
        const product = { idProducto, descripcion, precio, cantidad :this.cantidad }
        this.$store.commit('addCar', product)
        this.$store.commit('setMsg')
    },

  }
}
</script>
