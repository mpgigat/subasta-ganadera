// Referencias del HTML
const txtprecioinicial=document.querySelector('#txtprecioinicial')
const btnEnviarPrecioInicial  = document.querySelector('#btnEnviarPrecioInicial');
const txtidsalelotcattle=document.querySelector('#txtidsalelotcattle')
const txtprecioactual=document.querySelector('#txtprecioactual')
const txtholderactual=document.querySelector('#txtholderactual')
const btnEnviarPuja  = document.querySelector('#btnEnviarPuja');
const btnAdjudicar  = document.querySelector('#btnAdjudicar');
const btnDesierta  = document.querySelector('#btnDesierta');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

btnEnviarPrecioInicial.addEventListener( 'click', () => {

    const idSaleLotCattle = txtidsalelotcattle.value;
    const precioInicial = txtprecioinicial.value;

    const subasta = {
        idSaleLotCattle,
        precioInicial
    }    
    socket.emit( 'asigne-precio-inicial', subasta, ( msg ) => {
        console.log( msg );
    });

});



btnEnviarPuja.addEventListener( 'click', () => {

    const idSaleLotCattle = txtidsalelotcattle.value;
    const precioActual = txtprecioactual.value;
    const holderActual = txtholderactual.value;

    const subasta = {
        idSaleLotCattle,
        precioActual,
        holderActual
    }    
    socket.emit( 'guarde-puja', subasta, ( msg ) => {
        console.log( msg );
    });
});

btnAdjudicar.addEventListener( 'click', () => {
    const idSaleLotCattle = txtidsalelotcattle.value;

    const subasta = {
        idSaleLotCattle
    }    
    socket.emit( 'adjudique-subasta', subasta, ( msg ) => {
        console.log( msg );
    });
});

btnDesierta.addEventListener( 'click', () => {
    const idSaleLotCattle = txtidsalelotcattle.value;

    const subasta = {
        idSaleLotCattle
    }    
    socket.emit( 'declare-subasta-desierta', subasta, ( msg ) => {
        console.log( msg );
    });
});