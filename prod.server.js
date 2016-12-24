var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next){
	req.url = '/index.html';
	next();
});

app.use(router);

//Get data from data.json
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

//Set route for seller
apiRoutes.get('/seller', function(req, res){
  res.json({
    erron: 0,
    data: seller
  });
});

//Set route for goods
apiRoutes.get('/goods', function(req, res){
  res.json({
    erron: 0,
    data: goods
  });
});

//Set route for ratings
apiRoutes.get('/ratings', function(req, res){
  res.json({
    erron: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  
});