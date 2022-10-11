import {Router} from 'express'
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import cattleLotHttp from '../controllers/lotcattle.js';
import helpersSale from '../helpers/db-sale.js';
import helpersCattlelot from '../helpers/db-catllelot.js';
import helpersHolder from '../helpers/db-holder.js';
import helpersBreed from '../helpers/db-breed.js';

const router=Router();

router.get('/subasta/:sale',[
    validarJWT,
    check('sale',"Subasta no existe").isMongoId(),
    check("sale").custom(helpersSale.existeSaleById),
    validarCampos   
],cattleLotHttp.cattleLotGetSubasta);

router.get('/puja/:sale',[
    validarJWT,
    check('sale',"Subasta no existe").isMongoId(),
    check("sale").custom(helpersSale.existeSaleById),
    validarCampos   
],cattleLotHttp.cattleLotGetPuja);

router.get('/:id',[
    validarJWT,
    check('id',"Lote a subastar no existe").isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById), 
    validarCampos   
],cattleLotHttp.cattleLotGetById);

router.post('/',[    
    validarJWT,
    check('sale', "Subasta no existe").isMongoId(),
    check("sale").custom(helpersSale.existeSaleState),
    check('provider',"Proveedor no existe").isMongoId(),
    check("provider").custom(helpersHolder.existeHolderById),
    check('origin',"El origen es no debe quedar vacio").not().isEmpty(),
    check('quantity',"La cantidad debe ser numerica").isNumeric(),
    check('classcattle',"Clase no debe quedar vacio").not().isEmpty(),
    check('weight',"El peso es un valor numerico").isNumeric(),
    check('calfmale','Cantidad de crias es valor numerico').isNumeric(),
    check('calffemale','Cantidad de crias es valor numerico').isNumeric(),
    check('breed', "Raza no existe").isMongoId(),
    check("breed").custom(helpersBreed.existeBreedById),
    check('ica',"El campo ica no debe estar vacio").not().isEmpty(),
    validarCampos       
],    cattleLotHttp.cattleLotPost);

     
router.put('/:id',[
    validarJWT,
    check('id', "Lote a subastar no existe").isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotVerificarState),
    
    validarCampos
],cattleLotHttp.cattleLotPut);

router.put('/activate/:id',[
    validarJWT, 
    check('id', "Lote a subastar no existe").isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById),
    validarCampos
],cattleLotHttp.cattleLotPutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id', "Lote a subastar no existe").isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById),
    validarCampos
],cattleLotHttp.cattleLotPutDeactivate);

router.put('/subastar/:id',[
    validarJWT,
    check('id', "Lote a subastar no existe").isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById),    
    check("id").custom(helpersCattlelot.existeCattlelotVerificarStateLoteSubasta),    
    check("id").custom(helpersCattlelot.existeOtroLoteEnSubasta),
    validarCampos
],cattleLotHttp.cattleLotPutSubastar);

router.put('/rematar/:id',[
    validarJWT,
    check('id', "Lote a rematar no existe").isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById),
    check("id").custom(helpersCattlelot.existeCattlelotVerificarStateLoteSubasta),    
    check("id").custom(helpersCattlelot.existeOtroLoteEnSubasta),
    validarCampos
],cattleLotHttp.cattleLotPutRematar);

export default router