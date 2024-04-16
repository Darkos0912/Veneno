const express = require('express');
const routerUsers = express.Router();
const usersController = require('../controller/usersController');
/** MIDDLEWARES **/
const upload = require('../middlewares/multer');
const {arrRegister, validateRegister} = require('../middlewares/validateRegister');
const {arrLogin, validateLogin} = require('../middlewares/validateLogin');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

routerUsers.get('/login', guestMiddleware, usersController.renderLogin);
routerUsers.post('/login', arrLogin, validateLogin, usersController.enterHome );
routerUsers.get('/register', guestMiddleware, usersController.renderRegister);
routerUsers.post('/register', upload.single("image"), arrRegister, validateRegister, usersController.createUser);
routerUsers.get('/profile', authMiddleware, usersController.renderProfile);
routerUsers.get('/logout', usersController.logout);

module.exports = routerUsers;




