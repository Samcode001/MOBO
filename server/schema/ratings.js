const { default: mongoose } = require("mongoose");

const ratingSchema=new mongoose.Schema({
    productId:{
        type:String,
        Required:true
    },
    ratings:{
        type:Array,
        required:true
    }
});

const RATINGS=new mongoose.model("Ratings",ratingSchema);

module.exports=RATINGS;