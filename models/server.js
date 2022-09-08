import  express from 'express'
import cors from 'cors'
import {dbConnection} from '../database/config.js';
import fileUpload from 'express-fileupload'
import holder from '../routes/holder.js';
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
        // this.app.use("/api/laptop",    laptop);
        // this.app.use("/api/entry",    entry);
        
    }

    listen(){
        this.app.listen(this.port ,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export {Server}