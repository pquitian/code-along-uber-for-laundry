const User = require('../models/user');

module.exports.create = (req, res, next) => {
    res.render('auth/signup');
}

module.exports.doCreate =  (req, res, next) =>{
    const nameInput = req.body.name; 
    const emailInput = req.body.email;
    const passwordInput = req.body.password;

    if (emailInput === '' || passwordInput === '') {
        res.render('auth/signup', {
            errorMessage: "Enter both email and password"
        });
    } else {
        User.findOne({email: emailInput})
            .then(user => {
                if (user) {
                    res.render('auth/signup', {
                        user: req.body,
                        errors: { email: 'Email already registered' }
                    });
                } else {
                    user = new User(req.body);
                    return user.save()
                        .then(user => {
                            res.redirect('/');
                        });
                }
            })
            .catch(error => next(error));
            
    }
        
}