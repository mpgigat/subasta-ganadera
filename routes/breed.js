
import {Router} from 'express'
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import breedHttp from '../controllers/breed.js';
import helpersBreed from '../helpers/db-breed.js';


const router=Router();

router.get('/',[
    validarJWT,
    validarCampos   
],breedHttp.breedGet);

router.get('/:id',[
    validarJWT,
    check('id', 'Raza no existe').isMongoId(),
    check('id').custom(helpersBreed.existeBreedById), 
    validarCampos   
],breedHttp.breedGetById);

router.post('/',[   
    validarJWT, 
    check("description","La descripción es obligatoria").not().isEmpty(),
    check("description").custom(helpersBreed.existeDescription),
    validarCampos       
],    breedHttp.breedPost);

     
router.put('/:id',[
    validarJWT,
    check('id', 'Raza a modificar no existe').isMongoId(),
    check('id').custom(helpersBreed.existeBreedById),
    validarCampos
],breedHttp.breedPut);

router.put('/activate/:id',[
    validarJWT, 
    check('id',"Raza no existe").isMongoId(),
    check('id').custom(helpersBreed.existeBreedById),
    validarCampos
],breedHttp.breedPutActivate);

router.put('/unactivate/:id',[
    validarJWT,
    check('id',"Raza no existe").isMongoId(),
    check('id').custom(helpersBreed.existeBreedById),
    validarCampos
],breedHttp.breedPutDeactivate);

export default router