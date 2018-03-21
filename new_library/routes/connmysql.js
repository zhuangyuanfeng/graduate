const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yuanf',
    password: '123456',
    database: 'library',
    multipleStatements: true
});
export  default class Mysql{
    static connect(){
        connection.connect();
    }
    static end(){
        connection.end();
    }
}