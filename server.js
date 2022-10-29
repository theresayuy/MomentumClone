const path = require("path");
const express = require("express");
const cors = require("cors");
const con = require('./db');
require("dotenv").config();
const AES = require("crypto-js/aes");
const UTF8 = require("crypto-js/enc-utf8");
const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(cors());
const listener = app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${listener.address().port}`)
});

/*********************************/
/*                               */
/*              HEROKU           */
/*                               */
/*********************************/

// declare react files in build as static
app.use(express.static(path.join(__dirname, "build")));

// serve index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


/******************************************/
/*                                        */
/*              DECRYPT STRINGS           */
/*                                        */
/******************************************/

function getUTF8StrFromAES(str) {
    return AES.decrypt(str, 
        process.env.REACT_APP_CRYPTO_JS_KEY).toString(UTF8);
}

function getDecryptedTasksResult(result) {
    const decrpyedResult = [];
    for (let i = 0; i < result.length; i++) {
        decrpyedResult.push({
            content: getUTF8StrFromAES(result[i].content),
            checked: result[i].checked,
            editFormHidden: result[i].editFormHidden,
            id: result[i].id
        });
    }

    return decrpyedResult;
}

function getDecryptedBMResult(result) {
    const decrpyedResult = [];
    for (let i = 0; i < result.length; i++) {
        decrpyedResult.push({
            content: getUTF8StrFromAES(result[i].content),
            url: getUTF8StrFromAES(result[i].url),
            editFormHidden: result[i].editFormHidden,
            id: result[i].id
        });
    }

    return decrpyedResult;    
}

/************************************************/
/*                                              */
/*              MANAGE STORED TASKS             */
/*                                              */
/************************************************/

app.get(`/${process.env.DB_TASKS_TABLE}`, (req, res) => {
    con.query(`SELECT * FROM ${process.env.DB_TASKS_TABLE}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(getDecryptedTasksResult(result));
        }
    });
}); // get tasks

app.post(`/${process.env.DB_TASKS_TABLE}`, (req, res) => {    
    con.query(`INSERT INTO ${process.env.DB_TASKS_TABLE} SET ?`, req.body, 
        (err, _) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Task Added to Database");
            }
        }
    ); 
}); // adds a new task to the database

app.put(`/${process.env.DB_TASKS_TABLE}`, (req, res) => {
    const updateQuery =
        `UPDATE ${
            process.env.DB_TASKS_TABLE
        } SET content = ?, checked = ?, editFormHidden = ? WHERE id = ${req.body.id}`;
    con.query(
        updateQuery,
        [req.body.content, req.body.checked, req.body.editFormHidden, req.body.id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(getDecryptedTasksResult(result));
            }
        }
    );
}); // updates a task that already exists in the database
  
/****************************************************/
/*                                                  */
/*              MANAGE STORED BOOKMARKS             */
/*                                                  */
/****************************************************/

app.get(`/${process.env.DB_BM_TABLE}`, (req, res) => {
    con.query(`SELECT * FROM ${process.env.DB_BM_TABLE}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(getDecryptedBMResult(result));
        }
    });
}); // get bookmarks

app.post(`/${process.env.DB_BM_TABLE}`, (req, res) => {
    con.query(`INSERT INTO ${process.env.DB_BM_TABLE} SET ?`, req.body, (err, _) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Bookmark Added to Database");
        }
    });
}); // add new bookmark

app.put(`/${process.env.DB_BM_TABLE}`, (req, res) => {
    const updateQuery =
        `UPDATE ${
            process.env.DB_BM_TABLE
        } SET content = ?, url = ?, editFormHidden = ? WHERE id = ${req.body.id}`;
    con.query(
        updateQuery,
        [req.body.content, req.body.url, req.body.editFormHidden, req.body.id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(getDecryptedBMResult(result));
            }
        }
    );
}); // updates a bookmark that already exists in the database
