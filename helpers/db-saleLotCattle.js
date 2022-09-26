import SaleLotCattle from "../models/salelotcattle.js"
import LotCattle from "../models/lotcattle.js"
import Holder from "../models/holder.js"

const helpersSaleLotCattle = {
    existeSaleLotCattleById: async (id, req) => {
        const existe = await SaleLotCattle.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

    },

    existeSaleLotCattleByIdandState: async (id, req) => {
        const existe = await SaleLotCattle.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        } else if (existe.state == 2)
            throw new Error(`Subasta cerrada!!!`)
    },

    saleLotCattlePujar: async (subasta) => {
        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { currentprice: subasta.precioActual, currentholder: subasta.holderActual, $push: { bids: { holder: subasta.holderActual, price: subasta.precioActual } } },);

        return await Holder.findById(subasta.holderActual)
            
    },

    saleLotCattlePrecioInicial: async (subasta) => {
        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { initialprice: subasta.precioInicial });
    },

    saleLotCattleAdjudicar: async (subasta) => {
        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { state: 2 });
        const lotCattle = await LotCattle
            .findByIdAndUpdate(saleLotCattle.lotcattle, {
                awarded: saleLotCattle.currentholder,
                state: 2, price: saleLotCattle.currentprice
            });
    },

    saleLotCattleDesierta: async (subasta) => {
        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { state: 2 });
        const lotCattle = await LotCattle
            .findByIdAndUpdate(saleLotCattle.lotcattle, {state: 2 });
    },

}
export default helpersSaleLotCattle





