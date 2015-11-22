var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WebServices' });
});
/*	User Data structure */
function User(username, password, name, lname, isActive){
	this.email 	  = username;
	this.password = password;
	this.name 	  = name;
	this.lname	  = lname;
	this.isActive = isActive;
}

/* User Data List. */
var userList = [];

/* Addding users. */
var f = new User("lukas@martin.com", "martin", "lucas", "martin", true);
userList.push(f);

var d = new User("daniel@brenner.com", "dani", "daniel", "brenner", false);
userList.push(d);

var g = new User("lukas2@gmail.com", "lukas1", "lucas", "martin", true);
userList.push(g);

/* 
	defaultResponse components:
	{
		error: 'Error description';
	} 
*/

/* WebService */
router.post('/webService/Authenticate', function(req,res){
	var email = req.param('email').toLowerCase();
	var password = req.param('password');

	var defaultResponse = { error: 'User Not Found' };

	for(var i=0; i < userList.length; i++){
		if(userList[i].email == email){
		 if(userList[i].password == password){
		 	return res.send({name: userList[i].name, lname: userList[i].lname});
		 }else
		 	defaultResponse.error = 'Wrong credentials';
		}
	}

	res.send(defaultResponse);
});
/* WebService */
router.get('/webService/FindUserByEmail/:email', function(req,res){

	var email = req.params.email;
	var defaultResponse = { error: 'User Not found' };
	
	for(var i=0; i < userList.length; i++){
		if(userList[i].email == email && userList[i].isActive)
			return res.send(userList[i]);
	}
	return res.send(defaultResponse);
});
/* WebService */
router.get('/webService/FindUsersWithName/:name', function(req,res){
	var name = req.params.name;
	var users = [];
	var defaultResponse = { error: 'User Not found' };
	
	for(var i=0; i < userList.length; i++){
		if(userList[i].name == name && userList[i].isActive)
			users.push(userList[i]);
	}
	
	
	if(users.length <= 0)
		return res.send(defaultResponse);
	
	return res.send(users);
	
});

/* AUX FUNCTIONS!!! */

function isEmpty(obj) {
    if (obj === null) return true;
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

module.exports = router;
