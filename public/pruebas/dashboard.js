// Referencias HTML

const lblpeso=document.querySelector('#lblpeso')
const lblcantidad=document.querySelector('#lblcantidad')
const lbllote=document.querySelector('#lbllote')
const lblclase=document.querySelector('#lblclase')
const lblraza=document.querySelector('#lblraza')
const lblfemale=document.querySelector('#lblfemale')
const lblmale=document.querySelector('#lblmale')

const lblprecioinicial=document.querySelector('#lblprecioinicial')
const lblprecioactual=document.querySelector('#lblprecioactual')
const lblholderactual=document.querySelector('#lblholderactual')

const lbladjudicada=document.querySelector('#lbladjudicada')

const socket = io();

socket.on('disconnect', () => {
    console.log("Desconectado");
});

socket.on('actualizarestado', (lotes) => {
    console.log('Lotes: ',lotes);
});

socket.on('connect', () => {
    socket.emit( 'pidiendoinfoinicial', ( subasta) => {
        if (!subasta) return
        console.log("umm", subasta );
        lbllote.innerText = `Lote ${subasta.lotcattle.lot}`; 
        lblpeso.innerText = `Peso ${subasta.lotcattle.weight}`; 
        lblcantidad.innerText = `Cantidad ${subasta.lotcattle.quantity}`;
        lblclase.innerText = `Clase ${subasta.lotcattle.classcattle}`; 
        lblraza.innerText = `Raza ${subasta.lotcattle.breed.description}`; 
        lblfemale.innerText = `Crias Hembras ${subasta.lotcattle.calffemale}`; 
        lblmale.innerText = `Crias Machos ${subasta.lotcattle.calfmale}`;  

        lblprecioinicial.innerText = `Precio Inicial ${subasta.initialprice}`;  
        lblprecioactual.innerText = `Precio Actual ${subasta.currentpricekg}`;
        lblholderactual.innerText = `Holder Actual ${subasta.currentholder} #${subasta.currentconsecutiveholder}`; 

        lbladjudicada.innerText = `Estado subasta ${subasta.state}`; 
        
        
    });
  
});

socket.on('actualizarprecioinicial', ( subasta ) => {
    lblprecioinicial.innerText = `Precio Inicial ${subasta.precioInicial}`;  
})

socket.on('actualizarpuja', ( subasta ) => {
    lblprecioactual.innerText = `Precio Actual ${subasta.precioActual}`;
    lblholderactual.innerText = `Holder Actual ${subasta.holderActual} - #${subasta.paleta}`;    
})

socket.on('actualizarsubasta', ( subasta ) => {
    lbladjudicada.innerText = `Terminada`;
})

