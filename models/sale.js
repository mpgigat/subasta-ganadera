import mongoose from "mongoose";

const saleSchema=new mongoose.Schema({
    salenumber:{type:String, required:true,unique:true},
    type:{type:String,required:true},  
    consecutivelot:{type:Number, default:0},
    consecutiveholder:{type:Number, default:0},
    state:{type:String,default:1},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Sale",saleSchema)