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

router.get('/subasta/:id',[
    validarJWT,
    check('id').isMongoId(),
    check("id").custom(helpersSale.existeSaleById),
    validarCampos   
],cattleLotHttp.cattleLotGetSubasta);

router.get('/puja/:id',[
    validarJWT,
    check('id').isMongoId(),
    check("id").custom(helpersSale.existeSaleById),
    validarCampos   
],cattleLotHttp.cattleLotGetPuja);

router.get('/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById), 
    validarCampos   
],cattleLotHttp.cattleLotGetById);

router.post('/',[    
    validarJWT,
    check('sale').isMongoId(),
    check("sale").custom(helpersSale.existeSaleState),
    check('provider').isMongoId(),
    check("provider").custom(helpersHolder.existeHolderById),
    check('origin').not().isEmpty(),
    check('quantity').isNumeric(),
    check('classcattle').not().isEmpty(),
    check('weight').isNumeric(),
    check('calfmale').isNumeric(),
    check('calffemale').isNumeric(),
    check('breed').isMongoId(),
    check("breed").custom(helpersBreed.existeBreedById),
    check('ica').not().isEmpty(),
    validarCampos       
],    cattleLotHttp.cattleLotPost);

     
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotVerificarState),
    
    validarCampos
],cattleLotHttp.cattleLotPut);

router.put('/activate/:id',[
    validarJWT, 
    check('id').isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById),
    validarCampos
],cattleLotHttp.cattleLotPutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(helpersCattlelot.existeCattlelotById),
    validarCampos
],cattleLotHttp.cattleLotPutDeactivate);

export default router