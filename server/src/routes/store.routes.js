import {Router} from 'express';
import * as store from "../models/storeModel";
import { log } from 'util';

const router = Router()

router.get('/client/:id',async  (req, res) => {
    try {
        const client = await store.findClient(req.params.id)      
        res.json(client)
    } catch (error) {
        res.json({ message :'Error to show client', client})
    }
});

router.post('/addclient',async  (req, res) => {
    const { idCliente, primernombre, segundonombre, primerapellido, segundoapellido, telefono, direccion} = req.body
    try {
        const msg = await store.createClient(idCliente, primernombre, segundonombre, primerapellido, segundoapellido, telefono, direccion)
        res.json({ message: msg.message  })
    } catch (error) {
        res.json({ message: msg.message})
    }    
}); 

router.post('/addProduct',async  (req, res) => {
    const { idProducto, descripcion, precio, cantidadExistencia} = req.body
    try {
        const msg = await store.createProduct(idProducto, descripcion, precio, cantidadExistencia)
        res.json({ message: msg.message  })
    } catch (error) {
        res.json({ message: msg.message})
    }    
});

router.get('/products',async  (req, res) => {
    try {
        const allProducts = await store.findProducts()      
        res.json(allProducts)
    } catch (error) {
        res.json({ message :'Error to show Products', allProducts})
    }
});

router.post('/shop',async  (req, res) => {
    const items = req.body.carrito
    const idCliente = req.body.idCliente
    try {
        const msg = await store.realizarCompra(items, idCliente)
        res.json({ message: msg  })
    } catch (error) {
        throw error
    }    
});


export default router