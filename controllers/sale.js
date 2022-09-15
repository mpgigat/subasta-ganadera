import tools from "../helpers/tools.js";
import Sale from "../models/sale.js"
import Setup from "../models/setup.js"

const saleHttp = {

    saleGet: async (req, res) => {
        const { search } = req.query;

        const sale = await Sale.find(
            {
                $or: [
                    { salenumber: new RegExp(search, "i") },
                    { type: new RegExp(search, "i") }
                ]
            }
        );

        res.json({
            sale
        })
    },

    saleGetById: async (req, res) => {

        const { id } = req.params;

        const sale = await Sale.findOne({ _id: id });

        res.json({
            sale
        })
    },
         
    salePost: async (req, res) => {
        const {  type } = req.body;     
        const setup = await Setup.findOne( ); 
        let consecutivesale=0
        if (!setup) {
            const nuevosetup = new Setup();
            await nuevosetup.save()
            consecutivesale=1
        } else{
            consecutivesale=setup.consecutivesale+1
        } 
        await Sale.findOneAndUpdate({state:1},{state:2});
        const salenumber=tools.rellenarCeros(consecutivesale)
        const sale = new Sale({ salenumber,type});
        await sale.save()
        await Setup.findOneAndUpdate({},{consecutivesale});        
        res.json({
            sale
        })
    },

    salePut: async (req, res) => {
        const { id } = req.params;

        let { _id,  state, salenumber, createdAt, ...resto } = req.body;

        const sale = await Sale.findByIdAndUpdate(id, resto);

        res.json({
            sale
        })
    },

    salePutActivate: async (req, res) => {
        const { id } = req.params;

        const sale = await Sale.findByIdAndUpdate(id, { state: 1 });

        res.json({
            sale
        })
    },

    salePutDeactivate: async (req, res) => {
        const { id } = req.params;

        const sale = await Sale.findByIdAndUpdate(id, { state: 0 });

        res.json({
            sale
        })
    },


}

export default saleHttp
