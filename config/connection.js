const mysql = require("mysql2");
const util= require("util");
require('dotenv').config();

const connection=mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect(function(err){
      if(err) throw err;
    console.log(`Connected to the employees_db database.`)

    });
  
    connection.query = util.promisify(connection.query)

  module.exports = connection;