/*
    SETUP
*/

const express = require('express');
const app = express();
const PORT = 3002; // <-- Use any number between 1025–65535 that isn't in use

const db = require('./db-connector');


/*
    ROUTES
*/

app.get('/', async function (req, res) {
    try {
        const query1 = 'DROP TABLE IF EXISTS diagnostic;';
        const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        const query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL and Node is working for vickerdr!");';
        const query4 = 'SELECT * FROM diagnostic;';

        await db.query(query1);
        await db.query(query2);
        await db.query(query3);
        const [rows] = await db.query(query4);

        res.send("<h1>MySQL Results:</h1>" + JSON.stringify(rows));
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while running queries.");
    }
});


/*
    LISTENER
*/

app.listen(PORT, function () {
    console.log('Server started at http://classwork.engr.oregonstate.edu:' + PORT);
});
