var express = require('express');
var app = express();

app.use(express.static("public"));

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
    connection.query('INSERT INTO strain_names (strain_name) VALUES (?)'
    [req.query.strain_name], function(error, results, fields){
        if (error) res.send(error)
        else res.json({
            message: 'Puff Puff =3'
        });
    });
});

app.listen(4420, function(){
    console.log('Listening on 4420');
})