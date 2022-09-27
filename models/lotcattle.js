import mongoose from "mongoose";

const cattleLotSchema=new mongoose.Schema({
    sale:{type:mongoose.Schema.Types.ObjectId,ref:'Sale',required:true},
    provider:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',required:true},
    origin:{type:String, required:true},
    lot:{type:Number,default:0},
    quantity:{type:Number,default:0},
    classcattle:{type:String,required:true},
    weight:{type:Number,default:0},
    weightavg:{type:Number,default:0},//calculado
    calfmale:{type:Number,default:0},
    calffemale:{type:Number,default:0},
    breed:{type:mongoose.Schema.Types.ObjectId,ref:'Breed',required:true},
    ica:{type:String,required:true},
    state:{type:String,default:1},
    awarded:{type:mongoose.Schema.Types.ObjectId,ref:'Holder'},
    price:{type:Number,default:0},
    pricekg:{type:Number,default:0},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Lotcattle",cattleLotSchema)

