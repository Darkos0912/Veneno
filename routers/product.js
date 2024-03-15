const express = require('express');
const router = express.Router();
const productController = require('../controller/productsController');
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const carpetaDestinoImg = path.join(__dirname, "../public/img/products");
        cb(null,carpetaDestinoImg);
    },
    filename: (req,file,cb)=>{
        const nombreImgCargada = Date.now() + path.extname(file.originalname);
        cb(null,nombreImgCargada);
    }
});

const upload = multer({storage});

router.get('/productCart', productController.renderProductCart);
router.post('/productCart/:id', productController.processProductCart); 
router.delete('/productCart/delete/:id',upload.single("imagen"), productController.destroy); 

router.get('/girl',productController.girl);
router.get('/man',productController.man);
router.get('/remeras',productController.remeras);
router.get('/abrigos',productController.abrigos);
router.get('/pantalones',productController.pantalones);
router.get('/accesorios',productController.accesorios);
router.get('/', productController.products);                                         
router.get('/create',productController.create)                                     
router.get('/:id', productController.detail);                                 
router.post('/', upload.single("image"), productController.store);            
router.get('/edit/:id', productController.edit)                                   
router.put('/:id',upload.single("image"),productController.update)              
router.delete('/delete/:id', productController.delete)                                 

module.exports = router;