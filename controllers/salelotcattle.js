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
        const { sale ,weight} = req.CattlelotUpdate
        const saleLotCattle = new SaleLotCattle({ lotcattle, sale,weight });
        await saleLotCattle.save()
        await LotCattle
            .findByIdAndUpdate(saleLotCattle.lotcattle,{ state: 3 });
        res.json({
            saleLotCattle
        })
    },

    

}

export default saleLotCattleHttp
