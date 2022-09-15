import tools from "../helpers/tools.js";
import Breed from "../models/breed.js"

const breedHttp = {
    breedGet: async (req, res) => {
        const breed = await Breed.find();
        res.json({
            breed
        })
    },

    breedGetById: async (req, res) => {
        const { id } = req.params;
        const breed = await Breed.findOne({ _id: id });

        res.json({
            breed
        })
    },
         
    breedPost: async (req, res) => {
        const { description } = req.body;
        const breed = new Breed({ description});
        await breed.save()

        res.json({
            breed
        })
    },

    breedPut: async (req, res) => {
        const { id } = req.params;

        let { _id,  state, createdAt, ...resto } = req.body;
        const breed = await Breed.findByIdAndUpdate(id, resto);

        res.json({
            breed
        })
    },

    breedPutActivate: async (req, res) => {
        const { id } = req.params;

        const breed = await Breed.findByIdAndUpdate(id, { state: 1 });

        res.json({
            breed
        })
    },

    breedPutDeactivate: async (req, res) => {
        const { id } = req.params;

        const breed = await Breed.findByIdAndUpdate(id, { state: 0 });

        res.json({
            breed
        })
    },


}

export default breedHttp
