import {Router} from 'express'
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import saleholderHttp from '../controllers/saleholder.js';
import helpersSaleHolder from '../helpers/db-saleHolder.js';
import helpersHolder from '../helpers/db-holder.js';
import helpersSale from '../helpers/db-sale.js';


const router=Router();

router.get('/subasta/:sale',[
    validarJWT,
    check('sale',"Subasta no existe").isMongoId(),
    check("sale").custom(helpersSale.existeSaleById),
    validarCampos   
],saleholderHttp.saleHolderGetSubasta);


router.get('/:id',[
    validarJWT,
    check('id',"Registro no existe").isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById), 
    validarCampos   
],saleholderHttp.saleHolderGetById);

router.post('/',[    
    validarJWT,
    check('sale',"Subasta no existe").isMongoId(),
    check("sale").custom(helpersSale.existeSaleState),
    check('holder',"Usuario no existe").isMongoId(),
    check("holder").custom(helpersHolder.existeHolderById),
    check("consecutiveholder","El numero de la paleta es obligatoria").not().isEmpty(),
    check("consecutiveholder","El numero de la paleta es obligatoria").isNumeric(),
    check("consecutiveholder","Ya existe esepaleta en la subasta").custom(helpersSaleHolder.existePaleta),
    validarCampos       
],    saleholderHttp.saleHolderPost);

     
router.put('/:id',[
    validarJWT,
    check('id', "Registro no existe").isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById),
    check('holder', "Usuario no existe").isMongoId(),
    check('holder').custom(helpersHolder.existeHolderById),
    validarCampos
],saleholderHttp.saleHolderPut);

router.put('/activate/:id',[
    validarJWT, 
    check('id',"Registro no existe").isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById),
    validarCampos
],saleholderHttp.saleHolderPutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id',"Registro no existe").isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById),
    validarCampos
],saleholderHttp.saleHolderPutDeactivate);


export default router