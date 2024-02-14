const mysql = require("mysql2/promise");

const connect = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curriculum",
  });
};
module.exports = connect;
