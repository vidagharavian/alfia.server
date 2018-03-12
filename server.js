const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var app = express();



var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1235698",
  database:"alfia"
});

// hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());
connection.connect();


app.get('/', (req, res) => {
  res.render('index.hbs',{
    });
  });





  app.post('/', function(req, res){

  var username= req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM customers WHERE username = ?',[username], function (error, results, fields) {
  if (error) {
    res.send({
      "code":400,
      "failed":"error ocurred"
    });
  }else{
    debugger;
      if(results.length >0){
      for(var i=0; i<=results.length;i++){
        if(results[i].password == password){
        // res.send({
        //   "length":results.length,
        //   "code":200,
        //   "success":"login sucessfull"
        //     });
            res.render('adminpage.hbs', {
              pageTitle: 'manager'
            });
      }

    }
    res.send({
      "code":200,
      "succes":"invalid username or password"
    });
    }
  }
  });
  });


//
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.get('/adminpage', (req, res) => {
  res.render('adminpage.hbs', {
    pageTitle: 'manager'
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
