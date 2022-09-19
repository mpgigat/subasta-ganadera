import SaleLotCattle from "../models/salelotcattle.js"
import LotCattle from "../models/lotcattle.js"

const saleLotCattleHttp = {
    saleLotCattleGetSubasta: async (req, res) => {
        const { sale } = req.params
        const saleLotCattle = await SaleLotCattle.find({ sale })
            .populate("sale")
            .populate("lotcattle")
            .populate("currentholder")

        res.json({
            saleLotCattle
        })
    },

    saleLotCattleGetById: async (req, res) => {

        const { id } = req.params;

        const saleLotCattle = await SaleLotCattle.findOne({ _id: id })
            .populate({
                path: "lotcattle",
                populate: {
                    path: "sale"
                }
            }).populate("currentholder")
        res.json({
            saleLotCattle
        })
    },

    saleLotCattlePost: async (req, res) => {
        const { lotcattle } = req.body;
        const { sale } = req.CattlelotUpdate
        const saleLotCattle = new SaleLotCattle({ lotcattle, sale });
        await saleLotCattle.save()
        res.json({
            saleLotCattle
        })
    },

    // saleLotCattlePutPrecioInicial: async (req, res) => {
    //     const { id } = req.params;
    //     const { initialprice } = req.body;
    //     const saleLotCattle = await SaleLotCattle.findByIdAndUpdate(id, { initialprice });

    //     res.json({
    //         saleLotCattle
    //     })
    // },

    // saleLotCattlePutPujar: async (req, res) => {
    //     const { id } = req.params;
    //     const { holder, price } = req.body

    //     const saleLotCattle = await SaleLotCattle
    //         .findByIdAndUpdate(id, { currentprice: price, currentholder: holder , $push: {bids:{ holder, price }}},);

    //     res.json({
    //         saleLotCattle
    //     })
    // },

    // saleLotCattlePutAdjudicar: async (req, res) => {
    //     const { id } = req.params;
    //     const saleLotCattle = await SaleLotCattle.findByIdAndUpdate(id, { state: 2 });
    //     const lotCattle = await LotCattle
    //         .findByIdAndUpdate(saleLotCattle.lotcattle, {
    //             awarded: saleLotCattle.currentholder,
    //             state: 2, price: saleLotCattle.currentprice
    //         });


    //     res.json({
    //         saleLotCattle
    //     })
    // },

}

export default saleLotCattleHttp
