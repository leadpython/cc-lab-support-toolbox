const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const routes = require('./api.js');
const app = express();

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.static(path.join(__dirname, '../build')));

app.use(bodyParser.json());
app.use('/api', routes);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'../build/index.html'));
});

app.listen(8080, function () {
  console.log("App now running!");
});
