var express = require('express');
const session = require('express-session');
var app = express();

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
app.set('view engine', 'ejs');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'users_db'
});

connection.connect();

app.get('/signin', function (req, res) {
    res.render('pages/signin')
});

app.post('/signin', function (req, res) {
    console.log(req.body)
    req.session.user = req.body
    res.redirect('/profile')
});

app.get('/signup', function (req, res) {
    res.render('pages/signup')
});

app.post('/signup', function (req, res) {
    console.log(req.body)
    connection.query('INSERT INTO users SET ?', req.body, function (error, results, fields) {
        if (error) res.send(error)
        else {
            req.session.user = req.body
            res.redirect('/profile')
        }
    })
});

app.get('/profile', function (req, res) {
    console.log(req.session.user)
    res.render('pages/profile', req.session.user)
})

app.get('/logout', function (req, res) {
    console.log(req.session.user)
    req.session.destroy(function (err) {
        res.render('pages/index')
    })
})

app.get('/strains', function (req, res) {
    connection.query('SELECT * FROM strain_names', function (error, results, fields) {
        if (error){
            res.send(error)
            return
        }

        res.render('pages/strains', {results: results})  //{results} == {results: results} == {"results": results}
        console.log(results)
    })
})

app.get('/', function (req, res) {
    res.render('pages/signin')
})

app.listen(4420, function () {
    console.log('Listening on 4420');
})