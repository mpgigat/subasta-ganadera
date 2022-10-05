import Cattlelot from "../models/lotcattle.js"
import Sale from "../models/sale.js"
import tools from "./tools.js"

const helpersCattlelot = {
    existeCattlelotById: async (id, req) => {
        const existe = await Cattlelot.findById(id)

        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.CattlelotUpdate = existe

    },
    existeCattlelotVerificarState: async (id) => {
        const existe = await Cattlelot.findById(id)

        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        } else {
            const verificarState = await Sale.findById(existe.sale)

            if (verificarState.state != 1) {
                throw new Error(`No se pueden agregar lotes a esta subasta ${id}`)
            }

        }

    },

    existeCattlelotVerificarStateLoteSubasta: async (id,req) => {
        const existe = await Cattlelot.findById(id)

        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        } else {
            if (existe.state == 2) {
                throw new Error(`Lote ya subastado ${id}`)
            }
        }
        req.req.CattlelotUpdate = existe
    },

    getLotCattleSale:async(idsale)=>{
        let sale=idsale
        if (!idsale) sale =await Sale.findOne({state:1})
        if (!sale) return
        const cattleLot = await Cattlelot.find({sale})
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")
        
        return cattleLot
    }
    
}
export default helpersCattlelot





