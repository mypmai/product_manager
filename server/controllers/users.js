var mongoose=require('mongoose');
var User=mongoose.model('User');
var Product=mongoose.model('Product');
var ObjectId=require('mongodb').ObjectID;

module.exports={


	create_user: function(req,res) {
		// console.log('******Hitting Controllers Backend*********')
		// console.log('POST DATA', req.body)
		User.create(req.body, function(err,user){
			
			return res.json(user)
		})	
	},

	login: function(req,res){
		// console.log('Controllers Logginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
		User.findOne({email:req.body.loginEmail},function(err,user){
			if(user===null){
				err="User does not exist"	
			}
			else if(user.password===req.body.loginPass){
				// console.log(user._id)
				req.session.user=user
				// console.log(req.session.user._id)
				// username=req.session.user.first_name

				return res.json(user)
			}
			else{
				err="password incorrect"				
			}
			return res.json(err)	
		})
	},

	getSession:function(req,res){
		username=req.session.user.first_name
		return res.json({username:username})
	},

	checklogin:function(req,res){
		// console.log('hitting check login Controllers')
		if(req.session.user===undefined){
			return res.json(false)
		}
		else{
			return res.json(true)
		}
	},
	
	logout:function(req,res){
		req.session.destroy()
		// console.log(req.session)
		return res.redirect('/')
	},

	//********************Products*****************************************

	create_product:function(req,res){
	// console.log('---------Hittinnnngggg Products Controllers Route----------------------')
	// console.log(req.session.id)
	// console.log(req.session.username)
	// console.log(req.body)
	// console.log(req.session.user._id,'***********************************')
		User.findOne({_id:ObjectId(req.session.user._id)},function(err, user){
			// console.log(req.session.user._id)
			console.log(user)
			var product= new Product({title:req.body.title, price:req.body.price, image_url:req.body.image_url})	
			product._user=user._id;
			console.log(product._user,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
			User.update({_id:ObjectId(req.session.user._id)}, {$push: {products:product._id}},function(err){});
			product.save(function(err){
				if(err){
					console.log(err)
				}
				return 
			})
		})
	},

	getProduct:function(req,res){
		// console.log('hittingngngngngngnn get product')
		Product.find({},function(err,products){
			let info={
				userid:req.session.user._id,
				products:products
			}
			return res.json(info)
		})
	},

	delete:function(req,res){
		// console.log('Deleteeeeeeeeeeeeeeeeeeeeeeeee')
		// console.log(req.params.id)
		Product.remove({_id:req.params.id},function(err){
			return res.json()
		})
	},

	edit:function(req,res){
		// console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
		req.session.itemid=req.params.id
		itemid=req.session.itemid
		return res.json(itemid)
	},

	getItem:function(req,res){
		// console.log('get item Controllers&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
		// console.log(req.session.itemid)
		Product.findOne({_id:ObjectId(req.session.itemid)},function(err,product){
			return res.json(product)
		})
	},

	update:function(req,res){
		// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
		Product.update({_id:ObjectId(req.session.itemid)}, {$set: req.body},function(err,product){
			return res.json(product)
		})
	}


}