
import {Router} from 'express'
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import setupHttp from '../controllers/setup.js';

const router=Router();

router.get('/',[
    validarJWT,
    validarCampos   
], setupHttp.setupGet );

router.post('/',[    
    validarCampos       
],  setupHttp.setupPost  );

     
router.put('/',[
    validarJWT,
    validarCampos
], setupHttp.setupPut );

export default router