import mongoose from "mongoose";

const saleLotCattleSchema=new mongoose.Schema({
    lotcattle:{type:mongoose.Schema.Types.ObjectId,ref:'Lotcattle',required:true},
    sale:{type:mongoose.Schema.Types.ObjectId,ref:'Sale',required:true},
    bids:[
        {
            holder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder'},
            price:{type:Number,default:0}
        }
    ],
    initialprice:{type:Number,default:0},
    currentprice:{type:Number,default:0},
    currentholder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder'},
    state:{type:String,default:1},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Salelotcattle",saleLotCattleSchema)

