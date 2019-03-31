const mysql = require('mysql');
const co = require('co-mysql');
const config = require('../config');

let connection = mysql.createPool(config.MYSQL);
module.exports = co(connection);
