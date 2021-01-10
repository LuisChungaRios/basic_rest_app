const User = require('../models/User')
const _ = require('underscore')
const bcrypt = require('bcrypt')
class UserController {
    index(req, res) {
        let from = Number(req.query.from) || 0;
        let limit = Number(req.query.to) || 10

        return User.find({
            active: true
        }, 'name email role active google img')
            .skip(from)
            .limit(limit)
            .exec((err, users) => {
                if (err) {
                    return res.status(500)
                        .json({
                            success: false,
                            message: err
                        })
                }
                User.count({
                    active: true
                }, (err, count ) => {
                    return res.json({
                        success: true,
                        message: 'success',
                        data: users,
                        total: count
                    })
                })
            })


    }

    store(req, res){
        let {name, password, email, role} = req.body
        let user = new User({
            name,
            email,
            role,
            password: bcrypt.hashSync(password,10)
        })

        return user.save( ( err, userCreated) => {
            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: err
                    })
            }
            return res.json({
                success: true,
                message: 'success',
                data: userCreated
            })
        })
    }
    update(req, res){
        const id = req.params.id
        const body = _.pick(req.body,['name','email','img','role','active'])

        return User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: 'query'
        }, (err, userUpdated) => {
            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: err
                    })
            }
            return res.json({
                success: true,
                message: 'success',
                data: userUpdated
            })
        })
    }

    delete(req, res) {

        return User.findByIdAndUpdate(req.params.id, {active: false}, {
            new: true
        }, (err, UserDeleted) => {
            // TODO set message when user not found
            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: err
                    })
            }

            return res.json({
                success: true,
                message: 'success',
                data: UserDeleted
            })
        })
    }

    show(req, res) {

    }
}


module.exports = new UserController()