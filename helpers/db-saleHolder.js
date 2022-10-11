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
    existePaleta: async (paleta, req) => {
        if (paleta) {
            const existe = await SaleHolder.findOne({$and:[
                {sale: req.req.saleUpdate._id},
                {consecutiveholder:paleta}
            ] })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe._id.toString() !== req.req.holderUpdate._id.toString())
                        throw new Error(`Ya existe esepaleta en la subasta!!! ${paleta}`)

                } else {
                    throw new Error(`Ya existe esa paleta en la subasta!!! ${paleta}`)
                }
            }
        }
    },
}
export default helpersSaleHolder





