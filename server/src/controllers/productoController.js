
export const productoController = (sequelize, type) => {    
    return sequelize.define('producto',{
        idProducto: {
            type: type.INTEGER,
            primaryKey: true,
            unique: true
        },
        descripcion: type.STRING,
        precio: type.INTEGER,
        cantidadExistencia: type.INTEGER
    })
}