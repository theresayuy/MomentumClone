const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(cors());
var mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
});

/************************************************/
/*                                              */
/*              MANAGE STORED TASKS             */
/*                                              */
/************************************************/

app.get("/tasks", (req, res) => {
    con.query(`SELECT * FROM tasks`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}); // get tasks

app.post("/tasks", (req, res) => {
    con.query("INSERT INTO tasks SET ?", req.body, (err, _) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Task Added to Database");
        }
    });
}); // adds a new task to the database

app.put("/tasks", (req, res) => {
    const updateQuery =
        "UPDATE tasks SET content = ?, checked = ?, editFormHidden = ? WHERE id = " + req.body.id;
    con.query(
        updateQuery,
        [req.body.content, req.body.checked, req.body.editFormHidden, req.body.id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
}); // updates a task that already exists in the database
  
/****************************************************/
/*                                                  */
/*              MANAGE STORED BOOKMARKS             */
/*                                                  */
/****************************************************/

app.get("/bookmarks", (req, res) => {
    con.query(`SELECT * FROM bookmarks`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}); // get bookmarks

app.post("/bookmarks", (req, res) => {
    con.query("INSERT INTO bookmarks SET ?", req.body, (err, _) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Bookmark Added to Database");
        }
    });
}); // add new bookmark

app.put("/bookmarks", (req, res) => {
    const updateQuery =
        "UPDATE bookmarks SET content = ?, url = ?, editFormHidden = ? WHERE id = " + req.body.id;
    con.query(
        updateQuery,
        [req.body.content, req.body.url, req.body.editFormHidden, req.body.id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
}); // updates a bookmark that already exists in the database
