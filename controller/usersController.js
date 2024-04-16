const usersController = {
    renderLogin: (req,res) => {
        res.render("login");
    },
    enterHome: (req,res) => {
        res.redirect("/users/profile");
    },
    renderRegister: (req,res) => {
        res.render("register");
    },
    createUser: (req,res) => {
        res.redirect("login");
    },
    renderProfile: (req,res) => {

        const userLogged = req.session.userLogged;

        res.render("profile", {data: userLogged});
    },
    logout: (req,res) => {
        req.session.destroy();
        res.redirect("login");
    }
};

module.exports = usersController;