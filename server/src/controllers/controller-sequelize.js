import jsyaml from 'js-yaml';
import fs, { promises } from 'fs-extra';
import Sequelize from 'sequelize';
import { clienteController } from './clienteController';
import { compraController } from './compraController';
import { detalleCompraController } from './detalleController';
import { productoController } from './productoController';

var sequelize; 
var clienteModel;
var compraModel;
var detalleModel;
var productoModel;
async function connectDB() {
    if(typeof sequelize === 'undefined'){
        const yamltext = await fs.readFile(process.env.SEQUELIZE_CONNECT, 'utf8');
        const params = jsyaml.safeLoad(yamltext,'utf8');
        sequelize = await new Sequelize(params.dbname, params.username, params.password, params.params)
    }

    clienteModel =  clienteController(sequelize, Sequelize)
    compraModel = compraController(sequelize, Sequelize)
    productoModel = productoController(sequelize, Sequelize)
    detalleModel = detalleCompraController(sequelize, Sequelize)

    clienteModel.hasMany(compraModel) //cliente puede hacer muchas compras
    compraModel.belongsTo(clienteModel) //una compra la realiza un cliente
    detalleModel.belongsTo(compraModel) // el detalle de una compra se verifica sobre una compra
    detalleModel.belongsTo(productoModel) // el detalle de una compra se verifica sobre un producto
    
return sequelize.sync()
}

//----------------------Crea un cliente-----------------------
export async function createClient(idCliente, primernombre, segundonombre, primerapellido, segundoapellido, telefono, direccion) {
    try {
        await connectDB();        
        const newClient = await clienteModel.create({ 
            idCliente,
            primernombre,
            segundonombre,
            primerapellido,
            segundoapellido,
            telefono,
            direccion 
        });                        
        if(newClient) return { message : 'Client created sucessfully'}
        else return {message: ' ¡Opps Client already exists!'}
    } catch (e) {
        console.log(`Not CREATE ERROR ${e.stack}`);
        return {message: ' ¡Opps Client already exists!'}        
    }
}

//----------------------Crea un producto-----------------------
export async function createProduct(idProducto, descripcion, precio, cantidadExistencia ) {
    try {
        await connectDB();
        const newProduct = await productoModel.create({ 
            idProducto,
            descripcion,
            precio,
            cantidadExistencia 
        });                        
        if(newProduct) return { message : 'Product created sucessfully'}
        else return {message: ' ¡Opps product already exists!'}
    } catch (e) {
        console.log(`CREATE ERROR ${e.stack}`);
        return {message: ' ¡Opps product already exists!'}        
    }
}

//----------------------busca un cliente-----------------------

export async function findClient(idCliente) {
    try {
        await connectDB();
        const client = await clienteModel.findOne({
            where: { idCliente },
            attributes: [ 'idCliente','primernombre', 'segundonombre', 'primerapellido', 'segundoapellido', 'telefono', 'direccion']
        })
        return client
    } catch (e) {
        console.log(`FIND CLIENT ERROR ${e.stack}`);
        throw e
    }
}

//----------------------busca todos los productos-----------------------
export async function findProducts() {
    try {
        await connectDB();
        const allProducts = await productoModel.findAll({            
            attributes:['idProducto', 'descripcion', 'precio','cantidadExistencia'],
            order: [['precio', 'DESC']]
        })
        return allProducts
    } catch (e) {
        console.log(`FIND PRODUCTS ERROR ${e.stack}`);
        throw e
    }
}

//----------------------Realizar una compra-----------------------


//(idProducto: ***, descripcion: '****, precio: ***, cantidad: '***'  ) CLIENTE
//recorre cada item para crear la compra, su detalle y actualiza la cantidad de productos
//si el valor de la existencia - de la compra es mayor que 0  cree la compra y detalle y actualize

export async function realizarCompra(items, idCliente) {    
    try {
        if(items.length > 0){  
            await connectDB();
            var msg = null
            
            await asyncForEach( items, async (item) => {
                const elem = await productoModel.findOne({ where:{ idProducto: item.idProducto}}) // busca cada producto
                const val =  elem.cantidadExistencia-item.cantidad; 
                if(val >= 0) { 
                    await compraModel.create({//crea la compra para cada item
                        clienteIdCliente: idCliente,
                        totalCompra: item.cantidad*item.precio,
                    }).then(async (elem) => {//crea el detalle de la compra
                        await detalleModel.create({
                            cantidad: item.cantidad,
                            compraIdCompra: elem.idCompra, 
                            productoIdProducto: item.idProducto,
                        })
                    })
                    await elem.update( {cantidadExistencia: val})
                    msg = 'Shop successfully'
                }
                else{
                    msg =`La compra del producto ${elem.descripcion} no puede se mayor a " ${elem.cantidadExistencia}" unidades que existen`
                }
            })                        
        return msg
        }                                    
    } catch (e) {
        console.log(`SHOP ERROR  ${e.stack}`);
        throw e;
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
