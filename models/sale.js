import mongoose from "mongoose";

const saleSchema=new mongoose.Schema({
    salenumber:{type:String, required:true,unique:true},
    type:{type:String,required:true},  
    state:{type:String,default:1},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Sale",saleSchema)