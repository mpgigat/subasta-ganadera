
import {Router} from 'express'
import helpersSale from "../helpers/db-sale.js"
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import salesHttp from '../controllers/sale.js';

const router=Router();

router.get('/',[
    validarJWT,
    validarCampos   
],salesHttp.saleGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersSale.existeSaleById), 
    validarCampos   
],salesHttp.saleGetById);

router.post('/',[    
    check("type").not().isEmpty(),
    validarCampos       
],    salesHttp.salePost);

     
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersSale.existeSaleById),
    validarCampos
],salesHttp.salePut);

router.put('/activate/:id',[
    validarJWT, 
    check('id').isMongoId(),
    check('id').custom(helpersSale.existeSaleById),
    validarCampos
],salesHttp.salePutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(helpersSale.existeSaleById),
    validarCampos
],salesHttp.salePutDeactivate);

export default router