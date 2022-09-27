import Setup from "../models/setup.js"
import tools from "../helpers/tools.js";

const setupHttp = {

    setupGet: async (req, res) => {
        const setup = await Setup.find( );
        res.json({
            setup
        })
    },
            
    setupPost: async (req, res) => {  
        const {companyname,kgprice}=req.body  
        const cuantos = await Setup.find( );        
        if (cuantos.length==0) {
            const setup = new Setup({companyname,kgprice});
            await setup.save()
            res.json({
                setup
            })
        }else{
            res.json({
                msg:"Imposible Agregar"
            })
        }     
        
    },

    setupPut: async (req, res) => {
        let { _id, createdAt, ...resto } = req.body;
       
        resto=tools.actualizarRestoNumeros("consecutivesale",resto.consecutivesale,resto)                

        const anterior = await Setup.findOne( ); 
         
        if (anterior) {      
            const setup = await Setup.findByIdAndUpdate(anterior._id,resto);
    
            res.json({
                setup
            })
        }else{
            res.json({
                msg:"Imposible editar"
            })
        }
    },

}

export default setupHttp
