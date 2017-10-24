var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UsersSchema = require('../schemas/users.schema.js');
var User = mongoose.model('user',UsersSchema);
var uuid = require('node-uuid');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bank');
});

router.post('/login',function(req,res,next){
	// console.log(req.body.userForm);
	// console.log(req.body.passForm);
	uname=req.body.userForm;
	upass=req.body.passForm;
	console.log(uname);
	console.log(upass);
	if(uname!="" && upass!=""){
		User.find({$and:[{"username":uname},{"password":upass}]},function(err,doc){
			if(err){
				return res.json({message:"Error finding the username and password for the given values"});
			}
			else if(doc && doc.length > 1){
				console.log(doc)
				return res.json({message:"User is validated !!!!!","data_value":doc});	
			}
			else{
				return res.json({message:"No User found with that Name.. Please Register!!!"});
			}

		})
	}
});

router.post('/add',function(req,res,next){
	let username = req.body.username;
	let password = req.body.password;
	let newUser = new User({
		_id : uuid.v1(),
		username:username,
		password:password
	});
	newUser.save(function(err,data){
		if(err){
			return res.json({message:"Problem adding the data in DB"})
		}
		return res.json({NewProfile:true,value:data});
	});
});


module.exports = router;
