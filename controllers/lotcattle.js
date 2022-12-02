import helpersBreed from "../helpers/db-breed.js";
import helpersHolder from "../helpers/db-holder.js";
import tools from "../helpers/tools.js";
import Lotcattle from "../models/lotcattle.js"
import Sale from "../models/sale.js"

const cattleLotHttp = {
    cattleLotGetSubasta: async (req, res) => {
        const { sale } = req.params
        const cattleLot = await Lotcattle.find({ sale })
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")
            .populate("bids.holder")
        res.json({
            cattleLot
        })
    },

    cattleLotGetPuja: async (req, res) => {
        const { sale } = req.params
        const cattleLot = await Lotcattle.find({ sale })
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")

        res.json({
            cattleLot
        })
    },

    cattleLotGetById: async (req, res) => {
        const { id } = req.params;
        const cattleLot = await Lotcattle.findOne({ _id: id })
            .populate("sale")
            .populate("provider")
            .populate("breed")
            .populate("awarded")
        res.json({
            cattleLot
        })
    },

    cattleLotPost: async (req, res) => {
        const { sale, provider, origin, quantity, classcattle,
            weight, calfmale, calffemale, breed, ica, observations,asocebu,ganaderia
        } = req.body;
        const subasta = await Sale.findById(sale);
        const lot = subasta.consecutivelot + 1
        const weightavg = (weight / quantity).toFixed(1)
        const catllelot = new Lotcattle({ sale, provider, origin, lot, quantity, classcattle, weight, weightavg, calfmale, calffemale, breed, ica, observations,asocebu,ganaderia });
        await catllelot.save()
        await Sale.findByIdAndUpdate(sale, { consecutivelot: lot });
        res.json({
            catllelot
        })
    },

    cattleLotPut: async (req, res) => {
        const { id } = req.params;
        const errores = []
        let { _id, sale, lot, state, createdAt, ...resto } = req.body;
        if (resto.provider != undefined) {
            if (tools.validarMongoId(resto.provider)) {
                if (! await helpersHolder.existeHolderByIdFn(resto.provider)) {
                    delete resto["provider"];
                    errores.push("Id de Proveedor no existe!")
                }
            } else {
                errores.push("Id de Proveedor no existe")
                delete resto["provider"];
            }
        }
        resto = tools.actualizarResto("origin", resto.origin, resto)
        resto = tools.actualizarRestoNumeros("quantity", resto.quantity, resto)
        resto = tools.actualizarResto("classcattle", resto.classcattle, resto)
        resto = tools.actualizarRestoNumeros("weight", resto.weight, resto)
        resto = tools.actualizarRestoNumeros("calfmale", resto.calfmale, resto)
        resto = tools.actualizarRestoNumeros("calffemale", resto.calffemale, resto)
        resto = tools.actualizarRestoNumeros("observations", resto.observations, resto)
        // resto = tools.actualizarRestoNumeros("asocebu", resto.asocebu, resto)
        // resto = tools.actualizarRestoNumeros("ganaderia", resto.ganaderia, resto)
        if (resto.breed != undefined) {
            if (tools.validarMongoId(resto.breed)) {
                if (! await helpersBreed.existeBreedByIdFn(resto.breed)) {
                    delete resto["breed"];
                    errores.push("Id de Raza no existe!")
                }
            } else {
                errores.push("Id de Raza no existe")
                delete resto["breed"];
            }
        }
        resto = tools.actualizarResto("ica", resto.ica, resto)

        if (Object.entries(resto).length !== 0) {
            const catllelot = await Lotcattle.findByIdAndUpdate(id, resto);
            if (Object.keys(resto).includes("weight") || Object.keys(resto).includes("quantity")) {
                const existe = await Lotcattle.findById(id)
                const weightavg = (existe.weight / existe.quantity).toFixed(1)
                await Lotcattle.findByIdAndUpdate(id, { weightavg });
            }
            res.json({
                catllelot
            })
        } else {
            if (errores.length != 0)
                res.json({
                    errores
                })
            else
                res.json({
                    msg: "Inconsistencias en la información enviada!"
                })
        }



    },

    cattleLotPutActivate: async (req, res) => {
        const { id } = req.params;

        const cattleLot = await Lotcattle.findByIdAndUpdate(id, { state: 1 });

        res.json({
            cattleLot
        })
    },

    cattleLotPutDeactivate: async (req, res) => {
        const { id } = req.params;

        const cattleLot = await Lotcattle.findByIdAndUpdate(id, { state: 0 });

        res.json({
            cattleLot
        })
    },
    cattleLotPutSubastar: async (req, res) => {
        const { id } = req.params
        if (req.iniciado)
            res.json({
                msg: "Ok, Lote en subasta"
            })
        else {
            const lotCattle = await Lotcattle
                .findByIdAndUpdate(id,
                    {
                        state: 3,
                        salestate: "En subasta",
                        saletype: 1
                    });

            res.json({
                lotCattle
            })
        }
    },
    cattleLotPutRematar: async (req, res) => {
        const { id } = req.params
        if (req.iniciado)
            res.json({
                msg: "Ok, Lote en remate"
            })
        else {
            const lotCattle = await Lotcattle
                .findByIdAndUpdate(id,
                    {
                        state: 3,
                        salestate: "En remate",
                        saletype: 2
                    });
            res.json({
                lotCattle
            })
        }
    },

    deleteAll: async (req, res) => {
        const lotCattle = await Lotcattle
            .deleteMany();
        res.json({
            lotCattle
        })
    },





}

export default cattleLotHttp
