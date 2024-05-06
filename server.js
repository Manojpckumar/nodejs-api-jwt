var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
app.use(cors());

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var con = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "book_db"
})

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
})

// middleware to verify token
function verifyToken(req,res,next){
   let authHeader = req.headers.authorization;

   if(authHeader == undefined)
    {
        res.status(401).send({error:"Authorization token not found"});
    }
    let token = authHeader.split(" ").pop();
    jwt.verify(token,"secret",function(err,decoded){
        if(err){
            res.status(500).send({error:"Token verification failed"});
        }
        else
        {
            next();
        }
    })
}


// login details
app.post("/login",jsonParser,function(req,res){
    let username = req.body.username;
    let password = req.body.password;

    if(req.body.username == undefined || req.body.password == undefined)
        {
            res.status(500).send({error:"Authentication failed"});
        }
    
    let qr = `select * from users where username = '${username}' and password = sha1('${password}')`;

    con.query(qr,(err,result,fields) => {
        if(err || result.length == 0)
            {
                res.status(500).send({error:"Incorrect username or password / User not found"});
            }else
            {
                // res.status(200).send({success:"Login Successfull"});
                let resp = {
                    id : result[0].id,
                    displayname : result[0].displayname,
                }

                let token = jwt.sign(resp,"secret",{expiresIn:86400});
                res.status(200).send({success:true,token:token,message:"Authentication success"});
            }
    })
})

// list of books
app.get("/books", verifyToken,function (req, res) {
    con.query("select * from books", (err, result, fields) => {
        if(err) { res.send({error:"Operation failed"}); }
        else { res.send(result); }
    })
});

// new book add
app.post("/books", jsonParser,verifyToken, function (req, res) {
    let book_title = req.body.book_title;
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;

    let qr = `insert into books(book_title,description,author_name,price)values('${book_title}','${description}','${author_name}','${price}')`;

    con.query(qr, (err, result, fields) => {
        if (err) { res.send({ error: "Operation failed" }); }
        else { res.send({ error: "Operation Success" }); }
    });

});

// get one book info by id
app.get("/books/:id", verifyToken, function (req, res) {
    let id = req.params.id;
    con.query("select * from books where id = " + id, (err, result, fields) => {
        if (err) { res.send({ error: "Operation failed" }); }
        else { res.send(result); }
    });
});

// update a book
app.patch("/book", jsonParser,verifyToken, function (req, res) {
    let book_title = req.body.book_title;
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;
    let id = req.body.id;

    let qr = `update books set book_title = '${book_title}' , description = '${description}' ,author_name = '${author_name}' ,price = ${price} where id = ${id}`;

    con.query(qr, (err, result, fields) => {
        if (err) { res.send({ error: "Operation failed" }); }
        else { res.send({ error: "Book updated successfully" }); }
    });

});

// delete a book
app.delete("/book/:id", verifyToken,function (req, res) {
    let id = req.params.id;

    let qr = `delete from books where id = ${id}`;

    con.query(qr, (err, result, fields) => {
        if (err) { res.send({ error: "Operation failed" }); }
        else { res.send({ error: "Book deleted successfully" }); }
    });
});

app.listen(9000, function () {
    console.log("Server Started...")
})