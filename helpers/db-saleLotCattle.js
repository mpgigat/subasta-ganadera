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

    existeOtroLoteEnSubasta: async (idLotCattle,req) => {
        //const lotCattle=await LotCattle.findById(idLotCattle)
        const sale= req.req.CattlelotUpdate.sale;
        const existe = await SaleLotCattle.findOne({
            $and: [
                { sale },
                { state: 3 },
            ]
        })

        if (existe) {
            throw new Error(`Otro lote se esta subastando actualmente`)
        } 
    },

    saleLotCattlePujar: async (subasta) => {
        await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, 
                {   currentpricekg: subasta.precioActual, 
                    currentholder: subasta.holderActual,
                    currentconsecutiveholder:subasta.paleta,
                    currentprice:subasta.total, 
                    $push: { bids: 
                        { holder: subasta.holderActual, 
                            pricekg: subasta.precioActual,
                            consecutiveholder:subasta.paleta } } },);

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
                state: 2, 
                price: saleLotCattle.currentprice,
                pricekg:saleLotCattle.currentpricekg
            });
    },

    saleLotCattleDesierta: async (subasta) => {
        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { state: 2 });
        const lotCattle = await LotCattle
            .findByIdAndUpdate(saleLotCattle.lotcattle, {state: 2 });
    },

    buscarLoteSubastaActual: async () => {
        return await SaleLotCattle.findOne({state:3})   
            .populate({
                path: "lotcattle",
                populate: {
                  path: "breed"
                }
              })
            
    },

}
export default helpersSaleLotCattle





