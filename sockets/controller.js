
//al cerrar subasta no debe quedar nada pendiente.  todos o desiertos o subastados

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
    console.log("se conecto ", socket.id);

    // socket.emit( 'actualizar', subasta, ( msg ) => {
    //     console.log( msg );
    // });

    socket.on('asigneprecioinicial', async (subasta, callback) => {
        await helpersSaleLotCattle.saleLotCattlePrecioInicial(subasta)

        callback("Ok");
        socket.broadcast.emit('actualizarprecioinicial', subasta);
    });

    socket.on('guardepuja', async (subasta, callback) => {
        await helpersSaleLotCattle.saleLotCattlePujar(subasta)

        callback("Ok");
        socket.broadcast.emit('actualizarpuja', subasta);
    });

    socket.on('adjudiquesubasta', async (subasta, callback) => {
        const lotCattle = await helpersSaleLotCattle.saleLotCattleAdjudicar(subasta)

        callback(lotCattle);
        socket.broadcast.emit('actualizarsubasta', "Terminada");
    });

    socket.on('declaresubastadesierta', async (subasta, callback) => {
        const lotCattle = await helpersSaleLotCattle.saleLotCattleDesierta(subasta)

        callback(lotCattle);
        socket.broadcast.emit('actualizarsubasta', "Desierta");
    });

    socket.on('pidiendoinfoinicial', async (callback) => {
        const lotCattle = await helpersSaleLotCattle.buscarLoteSubastaActual()

        if (lotCattle) {            
            callback(lotCattle);
            socket.broadcast.emit('vernuevasubasta', lotCattle);
        }
        else
            callback("")


    });

    socket.on('iniciarnuevasubasta', async (callback) => {
        const lotCattle = await helpersSaleLotCattle.buscarLoteSubastaActual()
        callback("ok")
        socket.broadcast.emit('vernuevasubasta', lotCattle);
    });

}



export {
    socketController
}


