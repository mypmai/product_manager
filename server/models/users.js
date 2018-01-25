var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema= new Schema({
	first_name:String,
	last_name:String,
	email:String,
	password:String,
	products:[{type:Schema.Types.ObjectId,ref:'Product'}]
	
},{timestamps:true});

mongoose.model('User',UserSchema);

var ProductSchema= new Schema({
	title:String,
	price:Number,
	image_url:String,
	_user:{type:Schema.Types.ObjectId, ref:'User'}
	
},{timestamps:true});

mongoose.model('Product',ProductSchema);