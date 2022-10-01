import {Router} from 'express'
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import helpersSaleLotCattle from '../helpers/db-saleLotCattle.js';
import helpersHolder from '../helpers/db-holder.js';
import helpersLotCattle from "../helpers/db-catllelot.js"
import saleLotCattleHttp from '../controllers/salelotcattle.js';
import helpersSale from '../helpers/db-sale.js';

const router=Router();

router.get('/subasta/:sale',[
    validarJWT,
    check('sale',"Subasta no existe").isMongoId(),
    check("sale").custom(helpersSale.existeSaleById),
    validarCampos   
],saleLotCattleHttp.saleLotCattleGetSubasta);


router.get('/:id',[
    validarJWT,
    check('id',"Registro no existe").isMongoId(),
    check('id').custom(helpersSaleLotCattle.existeSaleLotCattleById), 
    validarCampos   
],saleLotCattleHttp.saleLotCattleGetById);

router.post('/',[    
    validarJWT,
    check('lotcattle',"Registro no existe").isMongoId(),
    check('lotcattle').custom(helpersLotCattle.existeCattlelotVerificarState),
    check("lotcattle").custom(helpersLotCattle.existeCattlelotVerificarStateLoteSubasta),    
    check("lotcattle").custom(helpersSaleLotCattle.existeOtroLoteEnSubasta),
    validarCampos       
],    saleLotCattleHttp.saleLotCattlePost);

// router.put('/precioinicial/:id',[
//     validarJWT, 
//     check('id').isMongoId(),
//     check('id').custom(helpersSaleLotCattle.existeSaleLotCattleById),
//     check('initialprice').isNumeric(),
//     validarCampos
// ],saleLotCattleHttp.saleLotCattlePutPrecioInicial);

// router.put('/pujar/:id',[
//     validarJWT, 
//     check('id').isMongoId(),
//     check('id').custom(helpersSaleLotCattle.existeSaleLotCattleByIdandState),
//     check('holder').isMongoId(),
//     check('holder').custom(helpersHolder.existeHolderById),
//     check('price').isNumeric(),

//     validarCampos
// ],saleLotCattleHttp.saleLotCattlePutPujar);

// router.put('/adjudicar/:id',[
//     validarJWT, 
//     check('id').isMongoId(),
//     check('id').custom(helpersSaleLotCattle.existeSaleLotCattleByIdandState),
//     validarCampos
// ],saleLotCattleHttp.saleLotCattlePutAdjudicar);







export default router