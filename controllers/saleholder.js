import tools from "../helpers/tools.js";
import SaleHolder from "../models/saleholder.js"
import Sale from "../models/sale.js"

const saleHolderHttp = {

    saleHolderGetSubasta: async (req, res) => {
        const { sale } = req.params
        const saleHolder = await SaleHolder.find({ sale })
            .populate("sale")
            .populate("holder")
        res.json({
            saleHolder
        })
    },

    saleHolderGetById: async (req, res) => {

        const { id } = req.params;

        const saleHolder = await SaleHolder.findOne({ _id: id })
            .populate("sale")
            .populate("holder")
        res.json({
            saleHolder
        })
    },

    saleHolderPost: async (req, res) => {
        const { sale, holder } = req.body;
        const subasta = await Sale.findById(sale);
        const consecutiveholder = subasta.consecutiveholder + 1

        const saleHolder = new SaleHolder({ sale, holder, consecutiveholder });
        await saleHolder.save()
        await Sale.findByIdAndUpdate(sale, { consecutiveholder });
        res.json({
            saleHolder
        })
    },

    saleHolderPut: async (req, res) => {
        const { id } = req.params;
        let { _id, sale, ...resto } = req.body;
        const saleHolder = await SaleHolder.findByIdAndUpdate(id, resto);
        res.json({
            saleHolder
        })

    },

    saleHolderPutActivate: async (req, res) => {
        const { id } = req.params;

        const saleHolder = await SaleHolder.findByIdAndUpdate(id, { state: 1 });

        res.json({
            saleHolder
        })
    },

    saleHolderPutDeactivate: async (req, res) => {
        const { id } = req.params;

        const saleHolder = await SaleHolder.findByIdAndUpdate(id, { state: 0 });

        res.json({
            saleHolder
        })
    },

    

}

export default saleHolderHttp
