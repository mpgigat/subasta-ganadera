import Cattlelot from "../models/lotcattle.js"
import Sale from "../models/sale.js"

const helpersCattlelot = {
    existeCattlelotById: async (id, req) => {
        const existe = await Cattlelot.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.CattlelotUpdate = existe

    },
    existeCattlelotVerificarState: async (id) => {
        const existe = await Cattlelot.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
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
            throw new Error(`El id no existe ${id}`)
        } else {
            if (existe.state != 1) {
                throw new Error(`Lote ya subastado ${id}`)
            }

        }

        req.req.CattlelotUpdate = existe

    },
}
export default helpersCattlelot





