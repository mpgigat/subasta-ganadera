
import helpersSaleLotCattle from "../helpers/db-saleLotCattle.js";
const subasta={
    idSaleLotCattle:"",
    precioInicial:0,
    holderActual:"5",
    precioActual:0
}
const socketController = (socket) => {
    // Cuando un cliente se conecta
 console.log("se conecto ", socket.id);
 
    // socket.emit( 'actualizar', subasta, ( msg ) => {
    //     console.log( msg );
    // });

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

    // socket.on('pidiendo-info-inicial', async ( subasta, callback ) => {
            
    //     callback( "Ok" );
    //     socket.broadcast.emit( 'actualizar-subasta', "Desierta");
    // }); 

}



export {
    socketController
}


