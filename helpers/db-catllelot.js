import Cattlelot from "../models/lotcattle.js"
import Sale from "../models/sale.js"
import SaleHolder from "../models/saleholder.js"
import Holder from "../models/holder.js"
import tools from "./tools.js"
import lotcattle from "../models/lotcattle.js"

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

    existeCattlelotVerificarStateLoteSubasta: async (id, req) => {
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

    getLotCattleSale: async (sale) => {

        const cattleLot = await Cattlelot.find({ sale })
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")
            .populate("awardedtemp")
            .populate("bids.holder")
        return cattleLot
    },
    setLotCattlePrecioInicial: async (subasta) => {
        //recibe el id del lote
        if (!subasta.idLotCattle) return

        const lotCattle = await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle,
                {
                    initialprice: subasta.precioInicial,
                    pricetoget: subasta.precioInicial
                });

        return await helpersCattlelot.buscarLoteSubastaActual()
    },

    buscarLoteSubastaActual: async () => {
        const cattleLot = await Cattlelot.findOne({ state: 3 })
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")
            .populate("awardedtemp")
            .populate("bids.holder").lean()

        if (!cattleLot) return {}

        const saleHolders = await SaleHolder
            .find({ sale: cattleLot.sale })
            .populate("holder")
        cattleLot.holders = saleHolders

        return cattleLot
    },

    setPuja: async (subasta) => {
        if (!subasta.holderActual) return
        if (!tools.validarMongoId(subasta.holderActual)) return

        const valueperanimal = subasta.total / subasta.cantidad
        const pricetoget = parseInt(subasta.precioPuja) + parseInt(subasta.incremento)

        const lotCattle = await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle,
                {
                    awardedtemp: subasta.holderActual,
                    consecutiveholdertemp: subasta.paleta,
                    pricekgtemp: subasta.precioPuja,
                    totalpricetemp: subasta.total,
                    valueperanimaltemp: valueperanimal,
                    pricetoget,
                    $push: {
                        bids:
                        {
                            holder: subasta.holderActual,
                            consecutiveholder: subasta.paleta,
                            pricekg: subasta.precioPuja,
                            valueperanimal: valueperanimal,
                            totalprice: subasta.total
                        }
                    }
                },)

        return await helpersCattlelot.buscarLoteSubastaActual()
    },

    setPrecioEsperado: async (subasta) => {
        if (!subasta.idLotCattle) return
        if (!tools.validarMongoId(subasta.idLotCattle)) return

        const lotCattle = await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle, { pricetoget: subasta.precioEsperado },)

        return await helpersCattlelot.buscarLoteSubastaActual()
    },

    setRemate: async (subasta) => {
        if (!subasta.holderActual) return
        if (!tools.validarMongoId(subasta.holderActual)) return
        const valueperanimal = subasta.total / subasta.cantidad
        const pricetoget = parseInt(subasta.total) + parseInt(subasta.incremento)
        await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle,
                {
                    awardedtemp: subasta.holderActual,
                    consecutiveholdertemp: subasta.paleta,
                    pricekgtemp: subasta.preciokg,
                    totalpricetemp: subasta.total,
                    valueperanimaltemp: valueperanimal,
                    pricetoget,
                    $push: {
                        bids:
                        {
                            holder: subasta.holderActual,
                            consecutiveholder: subasta.paleta,
                            pricekg: subasta.preciokg,
                            valueperanimal: valueperanimal,
                            totalprice: subasta.total
                        }
                    }
                },);

        return await helpersCattlelot.buscarLoteSubastaActual()

    },

    setAdjudicar: async (subasta) => {
        if (!subasta.idLotCattle) return

        const actual = await Cattlelot.findById(subasta.idLotCattle);

        const existe = await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle, {
                awarded: actual.awardedtemp,
                consecutiveholder: actual.consecutiveholdertemp,
                totalprice: actual.totalpricetemp,
                pricekg: actual.pricekgtemp,
                valueperanimal: actual.valueperanimaltemp,
                state: 2,
                salestate: "Terminada"
            })

        const lotCattle = await Cattlelot.findById(existe._id)
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")
            .populate("awardedtemp")
            .populate("bids.holder");

        return lotCattle
    },

    setDesierta: async (subasta) => {
        if (!subasta.idLotCattle) return

        const existe = await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle,
                {
                    state: 2,
                    salestate: "Terminada Desierta"
                })

        const lotCattle = await Cattlelot
            .findById(existe._id)
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")
            .populate("awardedtemp")
            .populate("bids.holder");
        return lotCattle
    },

    setReiniciar: async (subasta) => {
        if (!subasta.idLotCattle) return

        const lotCattle = await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle,
                {
                    state: 1,
                    salestate: "En espera",
                    awarded: null,
                    consecutiveholder: 0,
                    totalprice: 0,
                    pricekg: 0,
                    valueperanimal: 0,
                    initialprice: 0,
                    pricetoget: 0,
                    saletype: 0,
                    awardedtemp: null,
                    consecutiveholdertemp: 0,
                    totalpricetemp: 0,
                    pricekgtemp: 0,
                    valueperanimaltemp: 0,
                    bids: []
                })
        return lotCattle
    },

    existeOtroLoteEnSubasta: async (idLotCattle, req) => {
        //const lotCattle=await LotCattle.findById(idLotCattle)
        const sale = req.req.CattlelotUpdate.sale;
        const existe = await Cattlelot.findOne({
            $and: [
                { sale },
                { state: 3 },
            ]
        })

        if (existe) {
            throw new Error(`Otro lote se esta subastando actualmente`)
        }
    },

    setElimineUltima: async (subasta) => {
        if (!subasta.idLotCattle) return

        await Cattlelot
            .findByIdAndUpdate(subasta.idLotCattle,
                {
                    $pop: { bids: 1 }
                },);

        return await helpersCattlelot.buscarLoteSubastaActual()

    },



}
export default helpersCattlelot





