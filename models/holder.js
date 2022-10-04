import mongoose from "mongoose";

const holderSchema=new mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String,minlength:8,required:true},
    document:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    phone:{type:String,required:true},    
    state:{type:String,default:1},
    ciudad:{type:String},
    direccion:{type:String},
    banco1:{type:String},
    banco1numero:{type:String},
    banco2:{type:String},
    banco2numero:{type:String},
    banco3:{type:String},
    banco3numero:{type:String}, 
    referidopor:{type:String}, 
    createdAt:{type:Date,default:Date.now   }
})

export default mongoose.model("Holder",holderSchema)