module.exports.create = (req, res, next) => {
    res.render('auth/signup',{
        errorMessage:""
    });
}

module.exports.doCreate =  (req, res, next) =>{
 
}