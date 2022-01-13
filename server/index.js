

const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "ammar",
    host: "localhost",
    password: 'password',
    port: '3307',
    database: "item_data"
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const date = req.body.date;
    const cost = req.body.cost;

    db.query(`INSERT INTO items ( name, date, cost) VALUES( ?, ?, ?)`,
     [name, date, cost], (err, res) => {
        if (err) {
            console.log(err);
        } 
        
    }); 

}); 

app.get('/items', (req, res) => {
    db.query(`SELECT * FROM items`, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.put('/update', (req, res) => {
    const name = req.body.name;
    const cost = req.body.cost;
    db.query(`UPDATE items SET cost = ? WHERE name = ?`, [cost, name], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
    }
)

app.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    db.query(`DELETE FROM items WHERE name = ?`, name, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})





app.listen(3001, () => {
    console.log("running");
})