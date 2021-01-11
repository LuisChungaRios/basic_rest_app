const User = require('../models/User')
const { signToken } = require('../middlewares/Auth')
const bcrypt = require('bcrypt')
class LoginController {
    index(req, res ) {
        return User.findOne({email : req.body.email, active: true}, (err, userFound) => {
            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: "User not found"
                    })
            }
            // TODO: add validation if user is active
            if (!userFound) {
                return res.status(500)
                    .json({
                        success: false,
                        message: "User not found"
                    })
            }
            if (LoginController.attempt(req.body.password, userFound.password)) {
                return res.json({
                    success: true,
                    message: "Login correct",
                    token: signToken(userFound)
                })
            }

            return res.status(500)
                .json({
                    success: false,
                    message: "Credentials is invalid"
                })

        })
    }

    static  attempt(password, passwordDB) {
        return bcrypt.compareSync(password, passwordDB)
    }


}

module.exports = new LoginController()