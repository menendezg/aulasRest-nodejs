var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    nombre:     {type:String},
    usuario:    {type:String},
    password:   {type:String},
    email:      {type:String}
});

module.exports=mongoose.model('User', userModel);