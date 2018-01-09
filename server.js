var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var business = require('./routes/business');

var app = express();

//View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// app.use('/', index);
// app.use('/api/vi/', todos);
app.use('/api/business/', business);

app.listen(3002, function(){
	console.log("Server started on port 3002...");
});