import SaleHolder from "../models/saleholder.js"
import Sale from "../models/sale.js"

const helpersSaleHolder = {
    existeSaleHolderById: async (id, req) => {
        const existe = await SaleHolder.findById(id)

        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.SaleHolderUpdte = existe

    },
    existeSaleHolderVerificarState: async (id) => {
        const existe = await SaleHolder.findById(id)

        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        } else {
            const verificarState = await Sale.findById(existe.sale)

            if (verificarState.state != 1) {
                throw new Error(`No se pueden agregar lotes o usuarios a esta subasta ${id}`)
            }

        }

    },
}
export default helpersSaleHolder





