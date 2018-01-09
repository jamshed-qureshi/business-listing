var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin1234@ds133476.mlab.com:33476/jamshed', ['businesses']);
var router = express.Router();

router.get('/getall', function(req, res, next){
	db.businesses.find(function(err, todos){
		if(err){
			res.send(err);
		} else {
			res.json(todos);
		}
	});
});

// // Get Single Todo
// router.get('/todo/:id', function(req, res, next){
// 	db.todos.findOne({
// 		_id: mongojs.ObjectId(req.params.id)
// 	}, function(err, todo){
// 		if(err){
// 			res.send(err);
// 		}	
// 		else{
// 			res.json(todo);
// 		}
// 	});
// });

// Save Todo
router.post('/addbusiness', function(req, res, next){
	var businesses = req.body;
	// if(!businesses.text || !(todo.isCompleted + '')){
	// 	res.status(400);
	// 	res.json({
	// 		"error": "Invalid Data"
	// 	});
	// } else {
		db.businesses.save(businesses, function(err, result){
			if(err){
				res.send(err);
			} else {
				res.json(result);
			}
		});
	});

// Update Business
router.put('/editbusiness/:id', function(req, res, next){
	var business = req.body;
	var updObj = {};
	if(business.company_name){
		updObj.company_name = business.company_name;
	}
	if(business.turnover){
		updObj.turnover = business.turnover;
	}
	if(business.estd){
		updObj.estd = business.estd;
	}
	if(business.location){
		updObj.location = business.location;
	}
	if(business.no_of_employee){
		updObj.no_of_employee = business.no_of_employee;
	}
	if(business.category){
		updObj.category = business.category;
	}				
	if(!updObj){
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	} else {
		db.businesses.update({
			_id: mongojs.ObjectId(req.params.id)
		}, updObj, {}, function(err, result){
			if(err){
				res.send(err);
			} else { 
				res.json(result);
			}
		});
	}
});


//Delete Todo
router.delete('/deletebusiness/:id', function(req, res, next){
	db.businesses.remove({
		_id: mongojs.ObjectId(req.params.id)
	},'', function(err, result){
			if(err){
				res.send(err);
			} else {
				res.json(result);
			}		
	});
});



module.exports = router;