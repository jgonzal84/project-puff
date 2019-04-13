var express = require('express');
var app = express();

app.use(express.urlencoded())
app.use(express.static("public"));
// set the view engine to ejs
app.set('view engine', 'ejs');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'users_db'
});

connection.connect();

app.get('/strain', function(req, res){
	connection.query('SELECT * FROM strain_names', function (error, results, fields) {
	  if (error) res.send(error)
      else res.json(results);
	});
});

app.get('/strain-insert', function(req, res){
    connection.query('INSERT INTO strain_names (strain_name) VALUES (?)',
    [req.query.strain_name], function(error, results, fields){
        if (error) res.send(error)
        else res.json({
            message: 'Puff Puff =3'
        });
    });
});

app.get('/signin', function(req, res){
    res.render('pages/signin')
});

app.post('/signin', function(req, res){
    console.log(req.body)
    res.send("Hit post sign in")
});

app.get('/', function(req, res){
    res.render('pages/index')
})

app.listen(4420, function(){
    console.log('Listening on 4420');
})