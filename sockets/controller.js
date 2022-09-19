import helpersSaleLotCattle from "../helpers/db-saleLotCattle.js";
const subasta={
    idSaleLotCattle:"",
    precioInicial:0,
    holderActual:"",
    precioActual:0
}

const socketController = (socket) => {
    // Cuando un cliente se conecta
    socket.emit( 'actualizar', subasta );    

    socket.on('asigne-precio-inicial', async ( subasta, callback ) => {
        await helpersSaleLotCattle.saleLotCattlePrecioInicial(subasta)
    
        callback( "Ok" );
        socket.broadcast.emit( 'actualizar-precio-inicial', subasta);
    });

    socket.on('guarde-puja', async ( subasta, callback ) => {
        await helpersSaleLotCattle.saleLotCattlePujar(subasta)
    
        callback( "Ok" );
        socket.broadcast.emit( 'actualizar-puja', subasta);
    });

    socket.on('adjudique-subasta', async ( subasta, callback ) => {
        await helpersSaleLotCattle.saleLotCattleAdjudicar(subasta)
    
        callback( "Ok" );
        socket.broadcast.emit( 'actualizar-subasta', "Terminada");
    });

    socket.on('declare-subasta-desierta', async ( subasta, callback ) => {
        await helpersSaleLotCattle.saleLotCattleDesierta(subasta)
    
        callback( "Ok" );
        socket.broadcast.emit( 'actualizar-subasta', "Desierta");
    });

}



export {
    socketController
}

