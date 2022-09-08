
const tools={
    actualizarResto:(field,resto)=>{
        if (field) if (field=="") {
            const {field,...temp}=resto
            return temp
        }
        return resto
    }
}


export default tools