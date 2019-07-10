
export const compraController = (sequelize,type) => {    
    return sequelize.define('compra', {
        idCompra:{
            type: type.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        totalCompra: type.INTEGER//Cuando se realice una compra automaticamente guarda la fecha de registro en el campo created
    })
}
