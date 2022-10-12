
//al cerrar subasta no debe quedar nada pendiente.  todos o desiertos o subastados

import helpersCattlelot from "../helpers/db-catllelot.js";
import helpersSaleLotCattle from "../helpers/db-saleLotCattle.js";
import lotcattle from "../models/lotcattle.js";
const subasta = {
    idSaleLotCattle: "",
    precioInicial: 0,
    holderActual: "5",
    precioActual: 0
}
const socketController = (socket) => {
    // Cuando un cliente se conecta
    //console.log("se conecto ", socket.id);

    socket.on('pidiendoinfoinicial', async (callback) => {
        const lotCattle = await helpersCattlelot.buscarLoteSubastaActual()

        if (lotCattle.sale) {            
            callback(lotCattle);
            socket.broadcast.emit('vernuevasubasta', lotCattle);
        }
        else
            callback("")
    });

    socket.on('asigneprecioinicial', async (subasta, callback) => {
        const lotCattle=await helpersCattlelot.setLotCattlePrecioInicial(subasta)

        callback(lotCattle);
        socket.broadcast.emit('actualizarprecioinicial', lotCattle);
    });

    socket.on('guardepuja', async (subasta, callback) => {
       
        const lotCattle=await helpersCattlelot.setPuja(subasta)

        callback(lotCattle);
        socket.broadcast.emit('actualizarpuja', lotCattle);
    });

    socket.on('guarderemate', async (subasta, callback) => {
        const lotCattle=await helpersCattlelot.setRemate(subasta)

        callback(lotCattle);
        socket.broadcast.emit('actualizarpuja', lotCattle);
    });

    socket.on('actualiceprecioesperado', async (subasta, callback) => {
        const lotCattle=await helpersCattlelot.setPrecioEsperado(subasta)

        callback(lotCattle);
        socket.broadcast.emit('actualizarpuja', lotCattle);
    });

    socket.on('adjudiquesubasta', async (subasta, callback) => {
        const lotCattle = await helpersCattlelot.setAdjudicar(subasta)

        callback({lotCattle,state:2});
        socket.broadcast.emit('actualizarsubasta', lotCattle);

        const estados= await helpersCattlelot.getLotCattleSale(lotCattle.sale._id) 
        socket.broadcast.emit('actualizarestado', estados);
    });

    socket.on('declaresubastadesierta', async (subasta, callback) => {
        const lotCattle = await helpersCattlelot.setDesierta(subasta)

        callback({lotCattle,state:2});
        socket.broadcast.emit('actualizarsubasta',lotCattle);

        const estados= await helpersCattlelot.getLotCattleSale(lotCattle.sale._id) 
        socket.broadcast.emit('actualizarestado', estados);

    });

    
    socket.on('iniciarnuevasubasta', async (callback) => {
        const lotCattle = await helpersCattlelot.buscarLoteSubastaActual()
        callback("ok")
        socket.broadcast.emit('vernuevasubasta', lotCattle);
    });

    socket.on('lotessubasta', async (idsala,callback) => {
        const lotCattle= await helpersCattlelot.getLotCattleSale(idsala)
        callback(lotCattle)
    });

    socket.on('reiniciarsubasta', async (subasta, callback) => {
        const lotCattle = await helpersCattlelot.setReiniciar(subasta)

        callback({lotCattle});

        const estados= await helpersCattlelot.getLotCattleSale(lotCattle.sale) 
        socket.broadcast.emit('actualizarestado', estados);

    });
}



export {
    socketController
}


