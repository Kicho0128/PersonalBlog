var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host:"192.168.43.144",
        port:"3306",
        user:"root",
        password:"ansel981212",
        database:"my_log"
    });
    return connection;
}

module.exports.createConnection = createConnection;
