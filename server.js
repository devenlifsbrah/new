var express = require('express');
var app = express();
var departments = require('./data/departments.json');
var employees = require('./data/employees.json');
var data = require('./data-service.js');
const multer = require("multer");
const path = require("path");
app.use(express.static('public'));
const HTTP_PORT = process.env.PORT || 8080;
var fs = require('fs');
let bodyParser = require('body-parser');
var hbs = require('express-handlebars');
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs', hbs({ extname: '.hbs' ,
                         helpers: {
							navLink: function(url, options){
                            return '<li' +
                           ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
                           '><a href="' + url + '">' + options.fn(this) + '</a></li>';
                          },
						  equal: function (lvalue, rvalue, options) {
                          if (arguments.length < 3)
                          throw new Error("Handlebars Helper equal needs 2 parameters");
                          if (lvalue != rvalue) {
                          return options.inverse(this);
                          } else {
                           return options.fn(this);
                           }
						  }
							 
}}
));
app.set('view engine', '.hbs');

 app.get('/', function (req, res) {
	 res.render('home');
	 
	 
 });
 app.use(function(req,res,next){
let route = req.baseUrl + req.path;
app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
next();
});
 
 const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  }
});




// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });
 
 app.get('/employees/add', function (req, res) {
	 res.render('addEmployee');
 });
  app.get('/images/add', function (req, res) {
	 res.render('addImage');
 });
  app.post('/images/add',upload.single('imageFile'), function (req, res) {
	 res.redirect('/images'); 
 });
 app.get('/images', function (req, res) {
	 
	 fs.readdir('./public/images/', function(err, items) {
     res.json({images:items});
	 res.render("images", {images:items});
});
	  });
 
 
 
 
  app.get('/home', function (req, res) {
	 	 res.render('home');

	 
 });
 
 
 app.get('/about', function (req, res) {
	 
	 res.render('about');
	 
	 
 });

  app.get('/employees/:value', function (req, res) {
	       data.num(req.params.value).then(function(succ){
		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
      	 
	 
 });

 

 
   app.get('/employees', function (req, res) {
	  
	
	  if(req.query.manager != 'undefined'){
		  data.Managers(req.query.manager).then(function(succ){
		 // use req.query.status value
		 
		 		console.log(req.query.manager)

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		 		 		console.log(req.query.manager)

		  res.json({
          data:'fail'
	   })
		 
		 
	 });
		  
	  } else if (req.query.status != 'undefined'){ 
	  data.stat(req.query.status).then(function(succ){
		 // use req.query.status value
		 

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
	  } else if (req.query.department != 'undefined'){
		  data.depart(req.query.department).then(function(succ){
		 // use req.query.status value
		 

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
		  
	  } else  {
	  
	 data.emp().then(function(succ){
		 // use req.query.status value
		 

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
	  }
	 
 });
 
 app.post('/employees/add', function (req, res) {
	 console.log(req.body);
	 data.addPeople(req.body).then(function(succ){
		  console.log(suc)
		 
		 
		 
	 }).catch(function(fail){
		 console.log(fail);
		 
		 
	 });
		
	 
 });
 
 
  app.get('/managers', function (req, res) {
          data.manage().then(function(succ){
		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
 });
  app.get('/departments', function (req, res) {
	 	 data.dep().then(function(succ){
		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
		
    
	 
 });
 
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
 
 
 

 
 
 

 
 
 app.listen(HTTP_PORT, function () {
   data.init().then(function(succ){
		console.log('server on!');
		 
		 
		 
	 }).catch(function(fail){
		 console.log('didnt load data');
		 
	 });
  
});

	 