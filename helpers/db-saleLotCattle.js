import SaleLotCattle from "../models/salelotcattle.js"
import LotCattle from "../models/lotcattle.js"
import Holder from "../models/holder.js"
import salelotcattle from "../models/salelotcattle.js"
import Saleholder from "../models/saleholder.js"
import tools from "./tools.js"

const helpersSaleLotCattle = {
    existeSaleLotCattleById: async (id, req) => {
        const existe = await SaleLotCattle.findById(id)

        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

    },

    existeSaleLotCattleByIdandState: async (id, req) => {
        const existe = await SaleLotCattle.findById(id)

        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
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
        if (!subasta) return
        if (!tools.validarMongoId(subasta.holderActual)) return
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
        if (!subasta) return

        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { initialprice: subasta.precioInicial });        
    },

    saleLotCattleAdjudicar: async (subasta) => {
        if (!subasta) return
        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { state: 2 });
        const lotCattle = await LotCattle
            .findByIdAndUpdate(saleLotCattle.lotcattle, {
                awarded: saleLotCattle.currentholder,
                state: 2, 
                price: saleLotCattle.currentprice,
                pricekg:saleLotCattle.currentpricekg
            });

        return lotCattle
    },

    saleLotCattleDesierta: async (subasta) => {
        if (!subasta) return
      //  console.log(subasta);
        
        const saleLotCattle = await SaleLotCattle
            .findByIdAndUpdate(subasta.idSaleLotCattle, { state: 2 });
        const lotCattle = await LotCattle
            .findByIdAndUpdate(saleLotCattle.lotcattle, {state: 2 });
    },

    buscarLoteSubastaActual: async () => {
 
        const saleLotCattle= await SaleLotCattle.findOne({state:3})   
            .populate({
                path: "lotcattle",
                populate: {
                  path: "breed"
                }
              }).lean()

        if (!saleLotCattle)      return {}
              
       const saleHolders=await Saleholder.find({ sale:saleLotCattle.sale })
       saleLotCattle.holders=saleHolders
  
       return saleLotCattle
            
    },

}
export default helpersSaleLotCattle





