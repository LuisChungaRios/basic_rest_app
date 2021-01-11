const jwt  = require('jsonwebtoken')
const {KEY, LIFETIME_TOKEN} = require('../config/auth')
class Auth {
    tokenIsValid(req, res, next) {
        let token = req.get('token')
        jwt.verify(token, KEY, (err, user ) => {
            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: err
                    })
            }
            req.user = user
            next()
        })
    }

    isAdmin(req, res, next) {
        if (req.user === 'ADMIN') {
            next()
        }

        return res.status(500)
            .json({
                success: false,
                message: "User not admin"
            })
    }

    signToken(user) {
        return jwt.sign({
            user
        }, KEY, { expiresIn: LIFETIME_TOKEN })
    }
}

module.exports = new Auth()