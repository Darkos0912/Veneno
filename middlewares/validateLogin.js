const {body, validationResult} = require("express-validator");
const {compareSync} = require("bcryptjs");
const {User} = require("../src/database/models");

const arrLogin = [
    body("email").notEmpty().withMessage("Debe ingresar un email").bail().isEmail().withMessage("Debe ingresar un formato de email válido"),
    body("password").notEmpty().withMessage("Debe ingresar una contraseña").bail().isLength({ min: 8, max: 12 }).withMessage("Debe tener entre 8 y 12 caracteres"),
];

const validateLogin = async (req, res, next) => {
    const errors = validationResult(req);
    const {email, password } = req.body;

    const userExist = await User.findOne({
        where: { email: email }
      })

    try{
        if(errors.isEmpty()){

            if(userExist){
                if(compareSync(password, userExist.password)){
                    req.session.userLogged = userExist;
                    next();
                }
                else{
                    res.render("login", {errors: {password: {msg: "La contraseña que ingresó es incorrecta"}}, old: req.body});
                }
            }

            if(!userExist){
                res.render("login", {errors: {email: {msg: "El email que ingresó es incorrecto"}}});
            }

        } else{
            throw errors;
        }
    }
    catch(err){
        res.render("login", {errors: err.mapped(), old: req.body});
    }
}

module.exports = {arrLogin, validateLogin};