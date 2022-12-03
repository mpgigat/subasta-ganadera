import mongoose from "mongoose";

const cattleLotSchema=new mongoose.Schema({
    sale:{type:mongoose.Schema.Types.ObjectId,ref:'Sale',required:true},
    provider:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',required:true},
    origin:{type:String, required:true},
    asocebu:{type:String, },
    ganaderia:{type:String, },
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
    salestate:{type:String,default:"En espera"},
    saletype:{type:Number,default:0},  //0en espera, 1 subasta  2: remate

    initialprice:{type:Number,default:0},
    pricetoget:{type:Number,default:0},

    awarded:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',default:null},    
    consecutiveholder:{type:Number,default:0},  
    totalprice:{type:Number,default:0},
    pricekg:{type:Number,default:0},    
    valueperanimal:{type:Number,default:0},

    awardedtemp:{type:mongoose.Schema.Types.ObjectId,ref:'Holder',default:null},
    consecutiveholdertemp:{type:Number,default:0},
    totalpricetemp:{type:Number,default:0},
    pricekgtemp:{type:Number,default:0}, 
    valueperanimaltemp:{type:Number,default:0},
    getvalueperanimaltemp:{type:Number,default:0},

    observations:{type:String},
    createdAt:{type:Date,default:Date.now   },
    bids:[
        {
            holder:{type:mongoose.Schema.Types.ObjectId,ref:'Holder'},
            totalprice:{type:Number,default:0},
            consecutiveholder:{type:Number,default:0},
            valueperanimal:{type:Number,default:0},
            pricekg:{type:Number,default:0},
        }
    ],
})

export default mongoose.model("Lotcattle",cattleLotSchema)

