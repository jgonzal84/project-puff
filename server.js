var express = require('express');
const session = require('express-session');
var app = express();

app.use(session({
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
    database: 'puff_db'
});

connection.connect();

app.get('/signin', function (req, res) {
    res.render('pages/signin')
});

app.post('/signin', function (req, res) {
    console.log(req.body)
    connection.query('SELECT id FROM users WHERE user_name=? AND user_password=?', [req.body.user_name, req.body.user_password], function(err,result){
        if (err) {
            res.redirect('/signin')
            return
        }
        req.session.user = req.body
        req.session.user.id = result[0].id
        console.log(req.session)
        res.redirect('/profile')
    })
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
        res.render('pages/signin')
    })
})

app.get('/strains', function (req, res) {
    connection.query('SELECT * FROM strains', function (error, results, fields) {
        if (error){
            res.send(error)
            return
        }

        res.render('pages/strains', {user_name: req.session.user.user_name, results: results})
        console.log(results)
    })
})

app.get('/strain_info/:name', function (req, res){
    connection.query('SELECT strains.id, strains.strain_name, strain_info.strain_fact, strain_info.strain_type, strain_info.strain_taste, strain_info.strain_image FROM strains LEFT JOIN strain_info ON strain_info.strain_id = strains.id WHERE strains.strain_name = ?', [req.params.name],function (error, results, fields){
        if (error){
            res.send(error)
            return
        }
        res.render('pages/strain_info', {
            user_name: req.session.user.user_name, results: results[0]
        })
        console.log(results)
    })
});

app.get('/my_strains', function (req, res){
    console.log("Inside get / my_strains", req.session.user)
    connection.query('SELECT * FROM trees LEFT JOIN strains ON strains.id = trees.my_tree WHERE trees.user_id=?', [req.session.user.id],function (error, results){
        if (error) {
            res.send(error)
            return
        }
        res.render('pages/my_strains', {
            user_name: req.session.user.user_name, results: results
        })
        console.log(results)
        // res.json(results[0])
    })
});

app.post("/my_strains/:id", function(req, res){
    connection.query('INSERT INTO trees SET ?', {user_id: req.session.user.id, my_tree: req.params.id}, function (error, results, fields) {
        if (error) 
            res.send(error)
        else {
            res.redirect('/my_strains')
        }
    })
});

app.get('/my_strain_delete', function(req, res){
    res.redirect('/my_strains')
})

app.post('/my_strain_delete/:id', function(req, res){
    connection.query('DELETE FROM trees SET ?', {user_id: req.session.user.id, my_trees: req.params.id}, function (error, results, fields) {
        if (error)
            res.send(error)
        else {
            res.redirect('/my_strains')
        }
    })
});

app.get('/', function (req, res) {
    res.render('pages/signin')
})

app.listen(4420, function () {
    console.log('Listening on 4420');
})