import mongoose from "mongoose";

const setupSchema=new mongoose.Schema({
    consecutivesale:{type:Number, default:0,unique:true},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Setup",setupSchema)