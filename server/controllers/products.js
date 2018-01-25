// var mongoose=require('mongoose');
// var Product=mongoose.model('Product');
// var User=mongoose.model('User');

// module.exports={
	
// 	create_product:function(req,res){
// 		// console.log('---------Hittinnnngggg Products Controllers Route----------------------')
// 		console.log(req.session.id)
// 		console.log(req.body)
// 		User.findOne({_id:req.session.id},function(err, user){
// 			var product= new Product({title:req.body.title, price:req.body.price, image_url:req.body.image_url});
// 			product._users=user._id;
// 			user.products.push(product);
// 			product.save(function(err){
// 				user.save(function(err){
// 					if(err){console.log("Error")
// 					}
// 					else{

// 						return res.json()
// 					}	
// 				})
// 			})
// 		})
		
// 	},





// }