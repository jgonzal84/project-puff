var express = require('express');
const session = require('express-session');
var app = express();

// add & configure middleware
app.use(session({
    // genid: (req) => {
    //     console.log('Inside the session middleware')
    //     console.log(req.sessionID)
    //     return uuid() // use UUIDs for session IDs
    // },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

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

app.get('/strain', function (req, res) {
    connection.query('SELECT * FROM strain_names', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

app.get('/strain-insert', function (req, res) {
    connection.query('INSERT INTO strain_names (strain_name) VALUES (?)',
        [req.query.strain_name], function (error, results, fields) {
            if (error) res.send(error)
            else res.json({
                message: 'Puff Puff =3'
            });
        });
});

app.get('/signin', function (req, res) {
    res.render('pages/signin')
});

app.post('/signup', function (req, res) {
    console.log(req.body)
    //{ user_name: 'j', user_email: 'j@j', user_password: 'jjj' }
    connection.query('INSERT INTO users SET ?', req.body, function (error, results, fields) {
        if (error) res.send(error)
        else {
            req.session.user = req.body
            res.redirect('/profile')
            // res.render('pages/profile', req.body)
        }
    })
});

app.get('/signup', function (req, res) {
    res.render('pages/signup')
});

app.post('/signin', function (req, res) {
    console.log(req.body)
    res.send("Hit post sign in")
});

app.get('/profile', function (req, res){
    console.log(req.session.user)
    res.render('pages/profile', req.session.user)
})

app.get('/', function (req, res) {
    res.render('pages/index')
})

app.listen(4420, function () {
    console.log('Listening on 4420');
})