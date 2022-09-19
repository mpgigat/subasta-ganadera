// Referencias HTML

const lblprecioinicial=document.querySelector('#lblprecioinicial')
const lblprecioactual=document.querySelector('#lblprecioactual')
const lblholderactual=document.querySelector('#lblholderactual')

const lbladjudicada=document.querySelector('#lbladjudicada')

const socket = io();

socket.on('connect', () => {
    console.log("Escuchando");
    
});

socket.on('disconnect', () => {
    console.log("Desconectado");
});

socket.on('actualizar-precio-inicial', ( subasta ) => {
    lblprecioinicial.style.display = '';
    lblprecioinicial.innerText = `Precio Inicial ${subasta.precioInicial}`;  
})

socket.on('actualizar-puja', ( subasta ) => {
    lblprecioactual.style.display = '';
    lblprecioactual.innerText = `Precio Actual ${subasta.precioActual}`;
    lblholderactual.style.display = '';
    lblholderactual.innerText = `Holder Actual ${subasta.holderActual}`;    
})

socket.on('actualizar-subasta', ( subasta ) => {
    lbladjudicada.style.display = '';
    lbladjudicada.innerText = `Terminada`;
})