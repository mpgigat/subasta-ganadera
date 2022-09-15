import Breed from "../models/breed.js"


const helpersBreed = {
    existeBreedById: async (id, req) => {
        const existe = await Breed.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.saleUpdate = existe

    },
    existeBreedByIdFn: async (id) => {
        const existe = await Breed.findById(id)

        if (!existe) {
            return false
        }
        return true
    },
    existeDescription: async (description, req) => {
        if (description) {
            const existe = await Breed.findOne({ description })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe._id.toString() !== req.req.holder._id.toString())
                        throw new Error(`Ya existe esa descripcion en la base de datos!!! ${description}`)

                } else {
                    throw new Error(`Ya existe esa descripción en la base de datos!!! ${description}`)
                }
            }
        }
    },
}
export default helpersBreed





