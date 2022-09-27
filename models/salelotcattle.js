import mongoose from "mongoose";

const saleLotCattleSchema=new mongoose.Schema({
    lotcattle:{type:mongoose.Schema.Types.ObjectId,ref:'Lotcattle',required:true},
    sale:{type:mongoose.Schema.Types.ObjectId,ref:'Sale',required:true},
    weight:{type:Number,default:0},
    bids:[
        {
            holder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder'},
            pricekg:{type:Number,default:0},
            consecutiveholder:{type:Number,default:0}
        }
    ],
    initialprice:{type:Number,default:0},
    currentprice:{type: Number,default:0},
    currentpricekg:{type:Number,default:0},
    currentholder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder'},
    currentconsecutiveholder:{type:Number,default:0},
    state:{type:String,default:3},
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Salelotcattle",saleLotCattleSchema)

