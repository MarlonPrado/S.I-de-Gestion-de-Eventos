const mysql = require('mysql');

const {database} = require('./keys');
const {promisify} = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La Conexion con la Base de datos fue cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos ha intentado hacer muchas conexiones sin exito');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('La Conexion con la base de datos fue rechazada');
        }
    }
    if(connection) connection.release();
    console.log('La conexion a la base de datos fue exitoso')
   
});


pool.query = promisify(pool.query);
module.exports = pool;