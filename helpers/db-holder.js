import Holder from "../models/holder.js"


const helpersHolder = {
    existeHolderById: async (id, req) => {
        const existe = await Holder.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.holderUpdate = existe

    },

    existeHolderByDocument: async (document, req) => {      
        
        if (document ) {
            const existe = await Holder.findOne({ document })

            if (!existe ) {
                throw new Error(`El documento no existe ${id}`)
            }
        }

    },

    existeEmail: async (email, req) => {
        if (email) {
            const existe = await Holder.findOne({ email })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.email !== req.req.holder.email)
                        throw new Error(`Ya existe ese serial en la base de datos!!! ${email}`)

                } else {
                    throw new Error(`Ya existe ese email en la base de datos!!! ${email}`)
                }
            }
        }
    },

    verificarEmail: () => {
        return async (req, res, next) => {
            const existe = await Holder.findOne({ email: req.body.email });

            if (!existe) {
                return res.status(401).json({ msg: `El email no está registrado` });
            }

            next();
        }
    },

    existeNumDocumento: async (document, req) => {
        if (document) {
            const existe = await Holder.findOne({ document })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe._id.toString() !== req.req.holder._id.toString())
                        throw new Error(`Ya existe ese serial en la base de datos!!! ${document}`)

                } else {
                    throw new Error(`Ya existe ese documento en la base de datos!!! ${document}`)
                }
            }
        }
    },


}
export default helpersHolder





