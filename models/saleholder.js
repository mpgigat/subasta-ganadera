import mongoose from "mongoose";

const saleHolderSchema=new mongoose.Schema({
    sale:{type:mongoose.Schema.Types.ObjectId,ref:'Sale',required:true},
    holder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',required:true},
    consecutiveholder:{type:Number, default:0},
    state:{type:String,default:1},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Saleholder",saleHolderSchema)