import  express from 'express'
import cors from 'cors'
import {dbConnection} from '../database/config.js';
import fileUpload from 'express-fileupload'
import holder from '../routes/holder.js';
import sale from '../routes/sale.js';
import setup from '../routes/setup.js';
import breed from '../routes/breed.js';
import lotcattle from '../routes/lotcattle.js';
import http from 'http'
import * as io from "socket.io"
import saleholder from '../routes/saleholder.js';
import saleLotCattle from "../routes/salelotcattle.js"

import { socketController } from '../sockets/controller.js';

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.conectarDB();
        this.middlewares();
        this.routes();
        //sockect
        this.server = http.createServer( this.app );
        this.io     = new io.Server( this.server );
        this.sockets();
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
        this.app.use("/api/saleholder",    saleholder); 
        this.app.use("/api/salelotcattle",    saleLotCattle); 
    }

    sockets() {

        this.io.on('connection', socketController );
       

    }

    listen(){
        this.server.listen(this.port ,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export {Server}