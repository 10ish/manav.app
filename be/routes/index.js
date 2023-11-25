const controller = require('../controllers')
const bcrypt = require('../middlewares/bcrypt');
const authValidator = require('../middlewares/authValidator')
const loginValidator = require('../middlewares/loginValidator');
const signupValidator = require('../middlewares/signupValidator');


module.exports = (app)=>{

    app.get('/userDetails', [authValidator.verifyToken], controller.getUserDetails)
    app.post('/login', [loginValidator.validateEmail, loginValidator.validatePassword],controller.login);
    app.post('/signup', [signupValidator.validateEmail,bcrypt.hashPassword],controller.signup);
    app.post('/logout', controller.logout);

   
}