import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar:{
    type:String
  },
  address:{
    type:Array
  }
});

const USER = mongoose.model("Admin", adminSchema);

export { USER };
