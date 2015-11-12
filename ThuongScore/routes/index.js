
exports.index = function (req, res) {
    res.render('index.html');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    console.log(name);
    if (name == "profile") {
        res.render('partials/profile.ejs', { user: req.user, isLogged: true });
    }else {
        res.render('partials/' + name + '.html');
    }
    
};

exports.profile = function (req, res) {
    res.render('partials/profile.ejs', { user: req.user });
   
};
