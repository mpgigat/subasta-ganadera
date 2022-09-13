
const tools={
    actualizarResto:(field,valueField,resto)=>{
        console.log(valueField,"prueba");
        
        if (valueField!=undefined) if (valueField=="") {
            delete resto[field];   
            return resto
        }
        
        return resto
    },
    actualizarRestoNumeros:(field,valueField,resto)=>{       
        if (valueField) if (isNaN(valueField)) {
           
            delete resto[field];           
            
            return resto
        }
        return resto
    },
    rellenarCeros:(value)=>{
        if(value.toString().length==1){
            return `000${value}`
        }else if(value.toString().length==2){
            return `00${value}`
        }else if(value.toString().length==3){
            return `0${value}`
        }else return value
    }
}


export default tools