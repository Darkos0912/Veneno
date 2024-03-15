const { body } = require('express-validator');
const db = require('../src/database/models');

const productsController = {

    renderProductCart: (req, res) => {
        db.Product.findAll({
            where:{
                cartSale:'1'
            }
        })
            .then(product => {
                const descuento = (product.discount * product.price) / 100;
                const precioDescuento = product.price - descuento;
                res.render('productCart', { data: product, precioDescuento })
            })
    },

    processProductCart: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
            })
            res.redirect(`/products/productCart`);
    },
    
    destroy: (req, res) => {
        db.Product.destroy({
            where: { 
                id: req.params.id 
            } 
        })
        .then(() => { 
            res.redirect('/products/productCart') 
        });
    },

    products: (req, res) => {
        db.Product.findAll()
            .then(product => {
                res.render('product', { product })
            })
    },

    create: (req, res) => { 
        res.render("create");
    },

    detail: (req, res) => {
        body('name').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
            body('description').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
            body('image').custom((value, { req }) => {
                if (!isValidImageFile(value)) {
                    throw new Error('La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF)');
                }
                return true;
            }),

            db.Product.findByPk(req.params.id)
                .then(product => {
                    db.Product.findAll({
                        where: {
                            category: product.category,
                            id: { [db.Sequelize.Op.ne]: product.id }
                        }
                    })
                        .then(productosRelacionados => {
                            res.render('detail', { data: product, products: productosRelacionados });
                        })
                })
    },

    store: (req, res) => {
        if (req.body.offer === "true") {
            req.body.offer = 1
        }
        else if (req.body.offer === "false") {
            req.body.offer = 0;
        };

        req.body.image = req.file.filename;
        db.Product.create(req.body)
            .then(() => {
                res.redirect("/products")
            });
    },

    edit: (req, res) => {

        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render("edit", { datos: product });
            })
    },

    update: (req, res) => {
        if (req.body.offer === "true") {
            req.body.offer = 1;
        }
        else if (req.body.offer === "false") {
            req.body.offer = 0;
        };

        db.Product.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.redirect("/products/" + req.params.id);
        
    },

    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(product => {
            res.redirect('/products');
        })
    },

    girl: (req, res) => {
        db.Product.findAll()
            .then(product => {
                let arrayPrendasMujer = [];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].gender === "mujer") {
                        arrayPrendasMujer.push(product[i]);
                    }
                }
                res.render('product', { product: arrayPrendasMujer });
            })
    },

    man: (req, res) => {
        db.Product.findAll()
            .then(product => {
                let arrayPrendasHombre = [];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].gender === "varon") {
                        arrayPrendasHombre.push(product[i]);
                    }
                }
                res.render('product', { product: arrayPrendasHombre });
            })
    },

    remeras: (req, res) => {
        db.Product.findAll()
            .then(product => {
                let arrayPrendasRemera = [];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].category === "remera") {
                        arrayPrendasRemera.push(product[i]);
                    }
                }
                res.render('product', { product: arrayPrendasRemera });
            })
    },

    abrigos: (req, res) => {
        db.Product.findAll()
            .then(product => {
                let arrayPrendasAbrigos = [];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].category === "abrigo") {
                        arrayPrendasAbrigos.push(product[i]);
                    }
                }
                res.render('product', { product: arrayPrendasAbrigos });
            })
    },

    pantalones: (req, res) => {
        db.Product.findAll()
            .then(product => {
                let arrayPrendasPantalones = [];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].category === "pantalon") {
                        arrayPrendasPantalones.push(product[i]);
                    }
                }
                res.render('product', { product: arrayPrendasPantalones });
            })
    },

    accesorios: (req, res) => {
        db.Product.findAll()
            .then(product => {
                let arrayPrendasAccesorios = [];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].category === "accesorio") {
                        arrayPrendasAccesorios.push(product[i]);
                    }
                }
                res.render('product', { product: arrayPrendasAccesorios });
            })
    }
}

module.exports = productsController;