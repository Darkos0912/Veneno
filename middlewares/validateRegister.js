const { body, validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");
const { User } = require("../src/database/models");

const arrRegister = [
    body('name').notEmpty().withMessage('Debe ingresar un nombre'),
    body('lastname').notEmpty().withMessage('Debe ingresar un apellido'),
    body('username').notEmpty().withMessage('Debe ingresar un nombre de usuario'),
    body('email').notEmpty().withMessage('Debe ingresar un email').bail().isEmail().withMessage('*Debe ingresar un formato de email válido'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña').bail().isLength({ min: 8, max: 12 }).withMessage("*Debe tener entre 8 y 12 caracteres"),
    body('passwordVerify').notEmpty().withMessage('Debe ingresar la contraseña nuevamente').bail().isLength({ min: 8, max: 12 }),
    body('gender').notEmpty().withMessage('Debe seleccionar un género'),
    body('age').notEmpty().withMessage('Debe ingresar la edad'),
    body('address').notEmpty().withMessage('Debe ingresar el domicilio'),
];

const validateRegister = async (req, res, next) => {
    const errors = validationResult(req);
    req.body.image = req.file;
    const { name, lastname, username, email, password, passwordVerify, image, gender, age, address } = req.body;



    const imageExist = (element) => {
        if (element) {
            return element.filename;
        }
        else {
            return "usuario.png";
        }
    }

    const userToCreated = await User.findOne({
        where: {
            email: email 
        }
    })

    const usernameToCreated = await User.findOne({
        where: {
            username: username
        }
    })
    

    try {
        
        
        if (errors.isEmpty()) {

            if(usernameToCreated){
                res.render("register", {errors: {username: {msg: "El nombre de usuario ya se encuentra registrado"}}, old: req.body});
            }
            
            else if(userToCreated){
                res.render("register", {errors: {email: {msg: "El email que ingresó ya se encuentra registrado"}}, old: req.body});
            }

            else if (password == passwordVerify) {
                delete passwordVerify;
                User.create({
                    name: name,
                    lastname: lastname,
                    username: username,
                    email: email,
                    password: hashSync(password, 10),
                    gender: gender,
                    image: imageExist(image),
                    age: age,
                    address: address
                })

                next();
            }
            else {
                res.render("register", {errors: {password: {msg: "Las contraseñas no coinciden"}}, old: req.body});
            }
        }
        else {
            throw errors;
        }
    }
    catch (err) {
        res.render("register", { errors: err.mapped(), old: req.body });
    }
}

module.exports = { arrRegister, validateRegister };