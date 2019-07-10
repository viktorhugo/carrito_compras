
var TheModule = null;
 
async function model() {
    try {
        if (TheModule) return TheModule
        TheModule = await require(`../controllers/controller-${process.env.STORE_MODEL}`);
        return TheModule;
    } catch (error) {
        console.log(error);
    }  
}

export async function createClient(idCliente, primernombre, segundonombre, primerapellido, segundoapellido, telefono, direccion) {
    try {
        const msg = await (await model()).createClient(idCliente, primernombre, segundonombre, primerapellido, segundoapellido, telefono, direccion);
        return msg        
    } catch (error) {
        console.log(error);
    }
}

export async function createProduct(idProducto, descripcion, precio, cantidadExistencia) {
    try {
        const msg = await (await model()).createProduct(idProducto, descripcion, precio, cantidadExistencia);
        return msg        
    } catch (error) {
        console.log(error); 
    }
}

export async function findClient(id) {
    try {
        const client = await (await model()).findClient(id);        
        return client        
    } catch (error) {
        console.log(error);
    }
}

export async function findProducts() {
    try {
        const allProducts = await (await model()).findProducts();        
        return allProducts        
    } catch (error) {
        console.log(error);
    }
}

export async function realizarCompra(items, idCliente) {
    try {
        const msg = await (await model()).realizarCompra(items, idCliente);
        console.log('====================================');
        console.log(msg);
        console.log('====================================');        
        return msg       
    } catch (error) {
        console.log(error);
    }
}







