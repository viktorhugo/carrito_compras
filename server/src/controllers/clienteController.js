
export const clienteController = (sequelize, type) => {    
    return sequelize.define('cliente', {
        idCliente: {
            type: type.INTEGER, 
            primaryKey: true,
            unique: true
        },
        primernombre: type.STRING,
        segundonombre: type.STRING,
        primerapellido: type.STRING,
        segundoapellido: type.STRING,
        telefono: type.INTEGER,
        direccion: type.STRING
    })
}