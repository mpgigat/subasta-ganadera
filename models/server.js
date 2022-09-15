import  express from 'express'
import cors from 'cors'
import {dbConnection} from '../database/config.js';
import fileUpload from 'express-fileupload'
import holder from '../routes/holder.js';
import sale from '../routes/sale.js';
import setup from '../routes/setup.js';
import breed from '../routes/breed.js';
import lotcattle from '../routes/lotcattle.js';

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
       await dbConnection()
    }

    middlewares(){ 
        this.app.use(cors());
        this.app.use(express.json()); 
        this.app.use(express.static('public'));    
    }

    routes(){
        this.app.use("/api/holder",    holder);
        this.app.use("/api/sale",    sale);
        this.app.use("/api/setup",    setup); 
        this.app.use("/api/breed",    breed); 
        this.app.use("/api/lotcattle",    lotcattle); 
    }

    listen(){
        this.app.listen(this.port ,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export {Server}