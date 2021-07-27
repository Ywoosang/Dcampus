const mysql = require("mysql2/promise");
const dbconfig = require('../config/config.js');

const pool = mysql.createPool(dbconfig);
module.exports = pool;







