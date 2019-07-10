
export const detalleCompraController = (sequelize,type) => {    
    return sequelize.define('detalleCompra', {
        idDetalleCompra:{
            type: type.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        cantidad: type.STRING
    })
}