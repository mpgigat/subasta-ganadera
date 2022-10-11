// Referencias del HTML
const lblpeso = document.querySelector('#lblpeso')
const lblcantidad = document.querySelector('#lblcantidad')
const lbllote = document.querySelector('#lbllote')
const lblclase = document.querySelector('#lblclase')
const lblraza = document.querySelector('#lblraza')

const txtprecioinicial = document.querySelector('#txtprecioinicial')
const btnEnviarPrecioInicial = document.querySelector('#btnEnviarPrecioInicial');
const txtidlotcattle = document.querySelector('#txtidlotcattle')
const txtprecioactual = document.querySelector('#txtprecioactual')
const txtprecioremate = document.querySelector('#txtprecioremate')
const txtholderactual = document.querySelector('#txtholderactual')
const txtpaleta = document.querySelector('#txtpaleta')
const txtincremento = document.querySelector('#txtincremento')
const txtprecioesperado = document.querySelector('#txtprecioesperado')
const btnprecioesperado = document.querySelector('#btnprecioesperado');
const btnEnviarPuja = document.querySelector('#btnEnviarPuja');
const btnAdjudicar = document.querySelector('#btnAdjudicar');
const btnDesierta = document.querySelector('#btnDesierta');
const btnEnviarRemate = document.querySelector('#btnEnviarRemate');
const btnreiniciar = document.querySelector('#btnreiniciar');

const btnPedirLotes = document.querySelector('#btnPedirLotes');

let weight;

const socket = io();

socket.on('connect', () => {
    //console.log("listos");

    socket.emit('pidiendoinfoinicial', (lotcattle) => {
        if (!lotcattle) return
        lbllote.innerText = `Lote ${lotcattle.lot}`;
        lblpeso.innerText = `Peso ${lotcattle.weight}`;
        lblcantidad.innerText = `Cantidad ${lotcattle.quantity}`;
        lblclase.innerText = `Clase ${lotcattle.classcattle}`;
        lblraza.innerText = `Raza ${lotcattle.breed.description}`;
        weight = lotcattle.weight
        cantidad = lotcattle.quantity
    });

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

btnEnviarPrecioInicial.addEventListener('click', () => {
    const idLotCattle = txtidlotcattle.value;
    const precioInicial = txtprecioinicial.value;

    const subasta = {
        idLotCattle,
        precioInicial
    }
    socket.emit('asigneprecioinicial', subasta, (msg) => {
        console.log(msg);
    });
});

btnEnviarPuja.addEventListener('click', () => {
    const idLotCattle = txtidlotcattle.value;
    const precioPuja = txtprecioactual.value;
    const holderActual = txtholderactual.value;
    const paleta = txtpaleta.value;
    const incremento = txtincremento.value;

    const total = precioPuja * weight
    //const cantidad=lblcantidad.value

    const subasta = {
        idLotCattle,
        precioPuja,
        holderActual,
        paleta,
        total,
        cantidad,
        incremento
    }

    socket.emit('guardepuja', subasta, (msg) => {
        console.log(msg);
    });
});

btnEnviarRemate.addEventListener('click', () => {
    const idLotCattle = txtidlotcattle.value;
    const holderActual = txtholderactual.value;
    const paleta = txtpaleta.value;
    const total = txtprecioremate.value;
    const preciokg = total / weight
    const incremento = txtincremento.value;

    const subasta = {
        idLotCattle,
        total,
        holderActual,
        paleta,
        preciokg,
        cantidad,
        incremento
    }
    socket.emit('guarderemate', subasta, (msg) => {
        console.log(msg);
    });
});

btnprecioesperado.addEventListener('click', () => {
    const idLotCattle = txtidlotcattle.value;
    const precioEsperado = txtprecioesperado.value;
    const subasta = {
        idLotCattle,
        precioEsperado
    }
    socket.emit('actualiceprecioesperado', subasta, (msg) => {
        // console.log( msg );
    });
});

btnAdjudicar.addEventListener('click', () => {
    const idLotCattle = txtidlotcattle.value;

    const subasta = {
        idLotCattle
    }
    socket.emit('adjudiquesubasta', subasta, (msg) => {
        // console.log( msg );
    });
});

btnDesierta.addEventListener('click', () => {
    const idLotCattle = txtidlotcattle.value;

    const subasta = {
        idLotCattle
    }
    socket.emit('declaresubastadesierta', subasta, (msg) => {
        console.log(msg);
    });
});

btnPedirLotes.addEventListener('click', () => {


    socket.emit('lotessubasta', (msg) => {
        console.log(msg);
    });
});

btnreiniciar.addEventListener('click', () => {
    const idLotCattle = txtidlotcattle.value;

    const subasta = {
        idLotCattle
    }
    socket.emit('reinciarsubasta’', subasta, (msg) => {
        console.log(msg);
    });
});