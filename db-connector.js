// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : 'cs340_vickerdr',           // <-- replace if different
    password          : '6415',                     // <-- last 4 digits of your OSU ID
    database          : 'cs340_vickerdr'            // <-- same as user
}).promise(); // This makes it so we can use async/await

// Export it for use in our application
module.exports = pool;
