import Sale from "../models/sale.js"


const helpersSale = {
    existeSaleById: async (id, req) => {
        const existe = await Sale.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.saleUpdate = existe

    },
}
export default helpersSale





