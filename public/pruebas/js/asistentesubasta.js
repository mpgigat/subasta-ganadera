// Referencias del HTML
const lblpeso=document.querySelector('#lblpeso')
const lblcantidad=document.querySelector('#lblcantidad')
const lbllote=document.querySelector('#lbllote')
const lblclase=document.querySelector('#lblclase')
const lblraza=document.querySelector('#lblraza')

const txtprecioinicial=document.querySelector('#txtprecioinicial')
const btnEnviarPrecioInicial  = document.querySelector('#btnEnviarPrecioInicial');
const txtidsalelotcattle=document.querySelector('#txtidsalelotcattle')
const txtprecioactual=document.querySelector('#txtprecioactual')
const txtholderactual=document.querySelector('#txtholderactual')
const txtpaleta=document.querySelector('#txtpaleta')
const btnEnviarPuja  = document.querySelector('#btnEnviarPuja');
const btnAdjudicar  = document.querySelector('#btnAdjudicar');
const btnDesierta  = document.querySelector('#btnDesierta');

let weight;

const socket = io();

socket.on('connect', () => {
    socket.emit( 'pidiendoinfoinicial', ( subasta) => {
        if (!subasta) return
        lbllote.innerText = `Lote ${subasta.lotcattle.lot}`; 
        lblpeso.innerText = `Peso ${subasta.lotcattle.weight}`; 
        lblcantidad.innerText = `Cantidad ${subasta.lotcattle.quantity}`;
        lblclase.innerText = `Clase ${subasta.lotcattle.classcattle}`; 
        lblraza.innerText = `Raza ${subasta.lotcattle.breed.description}`;   
        weight=subasta.lotcattle.weight
    });
  
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
    socket.emit( 'asigneprecioinicial', subasta, ( msg ) => {
        console.log( msg );
    });

});



btnEnviarPuja.addEventListener( 'click', () => {

    const idSaleLotCattle = txtidsalelotcattle.value;
    const precioActual = txtprecioactual.value;
    const holderActual = txtholderactual.value;
    const paleta = txtpaleta.value;
    const total=precioActual*weight
    
    const subasta = {
        idSaleLotCattle,
        precioActual,
        holderActual,
        paleta,
        total
    }    
    socket.emit( 'guardepuja', subasta, ( msg ) => {
        console.log( msg );
    });
});

btnAdjudicar.addEventListener( 'click', () => {
    const idSaleLotCattle = txtidsalelotcattle.value;

    const subasta = {
        idSaleLotCattle
    }    
    socket.emit( 'adjudiquesubasta', subasta, ( msg ) => {
        console.log( msg );
    });
});

btnDesierta.addEventListener( 'click', () => {
    const idSaleLotCattle = txtidsalelotcattle.value;

    const subasta = {
        idSaleLotCattle
    }    
    socket.emit( 'declaresubastadesierta', subasta, ( msg ) => {
        console.log( msg );
    });
});