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
    check('sale').isMongoId(),
    check("sale").custom(helpersSale.existeSaleById),
    validarCampos   
],saleholderHttp.saleHolderGetSubasta);


router.get('/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById), 
    validarCampos   
],saleholderHttp.saleHolderGetById);

router.post('/',[    
    validarJWT,
    check('sale').isMongoId(),
    check("sale").custom(helpersSale.existeSaleState),
    check('holder').isMongoId(),
    check("holder").custom(helpersHolder.existeHolderById),
    
    validarCampos       
],    saleholderHttp.saleHolderPost);

     
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById),
    check('holder', 'No es un ID válido').isMongoId(),
    check('holder').custom(helpersHolder.existeHolderById),
    validarCampos
],saleholderHttp.saleHolderPut);

router.put('/activate/:id',[
    validarJWT, 
    check('id').isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById),
    validarCampos
],saleholderHttp.saleHolderPutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(helpersSaleHolder.existeSaleHolderById),
    validarCampos
],saleholderHttp.saleHolderPutDeactivate);





export default router