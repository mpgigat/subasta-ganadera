import Sale from "../models/sale.js"


const helpersSale = {
    existeSaleById: async (id, req) => {
        const existe = await Sale.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.saleUpdate = existe

    },

    existeSaleState: async (id, req) => {
        const existe = await Sale.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }else if (existe.state!=1) {
            throw new Error(`No se pueden agregar lotes a esta subasta ${id}`)
        }

        req.req.saleUpdate = existe

    },

    existeSaleStateFn: async (id, req) => {
        const existe = await Sale.findById(id)

        if (!existe) {
            return false
        }else if (existe.state!=1) {
            return false
        }

        return true

    },

    existeSaleByIdFn: async (id) => {
        const existe = await Sale.findById(id)

        if (!existe) {
            return false
        }

        return true

    },
}
export default helpersSale





