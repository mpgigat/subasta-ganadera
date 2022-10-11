// Referencias HTML

const lblpeso=document.querySelector('#lblpeso')
const lblcantidad=document.querySelector('#lblcantidad')
const lbllote=document.querySelector('#lbllote')
const lblclase=document.querySelector('#lblclase')
const lblraza=document.querySelector('#lblraza')
const lblfemale=document.querySelector('#lblfemale')
const lblmale=document.querySelector('#lblmale')

const lblprecioinicial=document.querySelector('#lblprecioinicial')
const lblprecioesperado=document.querySelector('#lblprecioesperado')
const lblholderactual=document.querySelector('#lblholderactual')
const lbltotal=document.querySelector('#lbltotal')
const lblpreciokg=document.querySelector('#lblpreciokg')
const lblanimal=document.querySelector('#lblanimal')

const lbladjudicada=document.querySelector('#lbladjudicada')

const socket = io();

socket.on('disconnect', () => {
    console.log("Desconectado");
});

socket.on('actualizarestado', (lotes) => {
    console.log('Lotes: ',lotes);
});

socket.on('connect', () => {
    socket.emit( 'pidiendoinfoinicial', ( lotcattle) => {
        if (!lotcattle) return
        
        lbllote.innerText = `Lote ${lotcattle.lot}`; 
        lblpeso.innerText = `Peso ${lotcattle.weight}`; 
        lblcantidad.innerText = `Cantidad ${lotcattle.quantity}`;
        lblclase.innerText = `Clase ${lotcattle.classcattle}`; 
        lblraza.innerText = `Raza ${lotcattle.breed.description}`; 
        lblfemale.innerText = `Crias Hembras ${lotcattle.calffemale}`; 
        lblmale.innerText = `Crias Machos ${lotcattle.calfmale}`;  

        lblprecioinicial.innerText = `Precio Inicial ${lotcattle.initialprice}`;  
        lblprecioesperado.innerText = `Precio Esperado ${lotcattle.pricetoget}`;       
        
        lbltotal.innerText = `Precio total ${lotcattle.totalpricetemp}`;
        lblpreciokg.innerText = `Precio kg ${lotcattle.pricekgtemp}`;
        lblanimal.innerText = `Precio animal ${lotcattle.valueperanimaltemp}`;

        lbladjudicada.innerText = `Estado subasta ${lotcattle.salestate}`; 
        
        
    });
  
});

socket.on('actualizarprecioinicial', ( subasta ) => {
    lblprecioinicial.innerText = `Precio Inicial ${subasta.precioInicial}`;  
})

socket.on('actualizarpuja', ( lotcattle ) => {
       
    lbltotal.innerText = `Precio Total ${lotcattle.totalpricetemp}`;
    lblpreciokg.innerText = `Precio kg ${lotcattle.pricekgtemp}`;
    lblanimal.innerText = `Precio animal ${lotcattle.valueperanimaltemp}`;
    lblholderactual.innerText = `Holder Actual ${lotcattle.awardedtemp._id} - #${lotcattle.consecutiveholdertemp}`;    
    lbladjudicada.innerText = `Estado subasta ${lotcattle.salestate}`; 
    lblprecioesperado.innerText = `Precio Esperado ${lotcattle.pricetoget}`; 
})

socket.on('actualizarsubasta', ( subasta ) => {
    lbladjudicada.innerText = `Terminada`;
})

