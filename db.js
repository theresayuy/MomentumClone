var mysql = require('mysql');
require("dotenv").config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

/* con.connect(function(err) {
	let sqlQuery = `CREATE DATABASE ${process.env.DB}`;
    if (err) throw err;
    console.log("Connected!");
	   con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    sqlQuery = `CREATE TABLE ${process.env.DB_TASKS_TABLE} (content TEXT(4096), checked BOOL, editFormHidden BOOL, id INT(255))`;
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Tasks table created");
    });
    sqlQuery = `CREATE TABLE ${process.env.DB_BM_TABLE} (content TEXT(4096), url TEXT(4096), editFormHidden BOOL, id INT(255))`;
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Bookmarks table created");
    });
}); */

module.exports = con;
