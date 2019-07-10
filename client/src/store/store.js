import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Swal from 'sweetalert2';

Vue.use(Vuex)

export const store = new Vuex.Store({

    state:{
        carrito:[ ], //se guarda cada compra que se realiza (id, descripcion, precio, cantidad, cantidadExistencia)
        Cedula:null,//identificacion del cliente que realiza la compra
        data:null, // datos cliente (idCliente, nombres, apellidos, telefono, direccion)
        products: null, // todos los datos de cada producto (idProducto, descripcion, precio, cantidadExistencia)
        msg:null
        
    },
    mutations: {
        addCar:(state, product)=>{
            if(state.carrito.length == 0) {//si esta vacio el carrito
                state.carrito.push(product)
            }else{
                var est = true;
                for (let i = 0; i < state.carrito.length; i++) { //recorre el carrito                    
                    if (state.carrito[i].idProducto === product.idProducto ) {//pregunta si el idproducto nuevo es igual al evaluado  
                        state.carrito[i].cantidad++;
                        est = !est;
                        break;
                    }
                }
                if(est) state.carrito.push(product)
            }            
        },
        setCar: (state)=>{
            state.carrito = []
        },
        setMsg: state => state.msg = null,
    
        eliminarProducto: (state, idProducto) =>{
            var pos = null;
            for (let i = 0; i < state.carrito.length; i++) { //recorre el carrito para buscar la posición 
                if (state.carrito[i].idProducto == idProducto) { //guarda la posicion para eliminar
                    pos = i;
                    break;
                }                
            }
            state.carrito.splice(pos, 1) //elimina el producto del carrito
        },
    
        sendCompra:async (state)=>{
            try {
                const carrito = state.carrito
                const idCliente= state.data.idCliente 
                const data = await axios.post('http://localhost:9000/store/shop', {carrito, idCliente})                
                state.msg = data.data.message
                state.carrito = []
            } catch (error) {
                 throw error
            }
            
        },
    },
    getters:{
        buys: (state) => {
            return (state.carrito).length
        },
        datos: (state) => state.data,
        items: state => state.carrito,
        products: (state) => state.products,
        client: (state)=> {
            if(state.data == null){
                return 'Sing in';
            }else{
                return state.data.primernombre+' '+state.data.primerapellido;
            }
        },
        dCompra: (state) => {
            return state.carrito;
        },
        totalCompra:(state) => {
            return state.carrito.reduce((total, producto) => total + producto.precio*producto.cantidad, 0)
        },        
    },
    actions:{
        realizarCompra : (context) => {//si hay algun producto sin catidad para comprar no se envia
        
            const est = context.state.carrito.find(item => item.cantidad == 0);
            if(est){
             Swal.fire({
                 type: 'error',
                 title: 'Oops...',
                 text: 'Error quantity of products',
               })
            }else{
                context.commit('sendCompra');
             }
            
        }
    }
})
