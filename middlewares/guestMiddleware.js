const guestMiddleware = (req,res,next)=>{
    if (req.session.userLogged == undefined){
        next()
    }
    else {
        (res.redirect('/users/profile'));
    }
}

module.exports = guestMiddleware