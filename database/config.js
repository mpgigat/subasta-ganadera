//const mongoose = require('mongoose');
import mongoose from 'mongoose';
//MONGODB_CNN=mongodb+srv://AdsiClases:aNz2J1yc0AFDYIWF@cluster0.zxyca.mongodb.net/sistemaDB
//MONGODB_CNN=mongodb+srv://admin:82TMB1mgVNOLtdBp@cluster0.rxrvhhp.mongodb.net/biblioteca

const dbConnection=async()=>{
    try {
        
        await mongoose.connect(process.env.MONGODB_CNX)
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al iniciar la base de datos');
    }
}

export {
    dbConnection
}