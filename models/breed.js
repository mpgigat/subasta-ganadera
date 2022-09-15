import mongoose from "mongoose";

const breedSchema=new mongoose.Schema({
    description:{type:String, required:true,unique:true},
    state:{type:String,default:1},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Breed",breedSchema)