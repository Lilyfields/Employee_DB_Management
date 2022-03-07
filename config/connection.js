const util =require("util");
const mysql = require ("mysql2");
const {start} = require ("repl");

const connection= mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "employee_db"
    });
    connection.connect(function(err){
        if (err) throw err;
    console.log(`Connected to the employee_db database.`)
    });
    
    connection.query = util.promisify(connection.query);

  module.exports = connection;