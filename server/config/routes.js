var users=require('./../controllers/users.js');
// var products=require('./../controllers/products.js');
var path=require('path');

module.exports=function(app){
	app.post('/create_user',function(req,res){
		// console.log('Hitting Routes Backend*******************')
		return users.create_user(req,res)
	})
	app.post('/login',function(req,res){
		// console.log('Loggin routes Backend**************')
		return users.login(req,res)
	})
	app.get('/getSession',function(req,res){
		// console.log('getSession route*****************8')
		return users.getSession(req,res)
	})
	app.get('/checklogin',function(req,res){
		return users.checklogin(req,res)
	})

	app.get('/logout',function(req,res){
		// console.log('Loogggouttttttt')
		return users.logout(req,res)
	})
//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
	app.post('/create_product',function(req,res){
		return users.create_product(req,res)
	})

	app.get('/getProduct',function(req,res){
		return users.getProduct(req,res)
	})
	app.get('/delete/:id',function(req,res){

		return users.delete(req,res)
	})

	app.get('/edit/:id',function(req,res){
		return users.edit(req,res)
	})

	app.get('/getItem',function(req,res){
		return users.getItem(req,res)
	})

	app.post('/update',function(req,res){
		return users.update(req,res)
	})

	app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
    })


};
