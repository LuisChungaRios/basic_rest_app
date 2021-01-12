const Category = require('../models/Category')
class CategoryController {
    index(req, res) {

        return Category.find({})
            .sort('description')
            .populate('User','name email')
            .exec((err, categories) => {
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
                    data: categories
                })
            })


    }

    show(req, res) {
        return Category.findById(req.params.id,(err, category) => {
                if (err) {
                    return res.status(500)
                        .json({
                            success: false,
                            message: err
                        })
                }

                if (! category) {
                    return res.status(500)
                        .json({
                            success: false,
                            message: 'Category not found'
                        })
                }

                return res.json({
                    success: true,
                    message: 'success',
                    data: category
                })
            })
    }

    store(req, res){
        let {description} = req.body

        let category = new Category( {
            description,
            user: req.user._id
        })
        return category.save( ( err, categoryCreated) => {
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
                data: categoryCreated
            })
        })
    }
    update(req, res){
        const id = req.params.id
        const body = {
            description: req.params.description
        }

        return Category.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: 'query'
        }, (err, categoryUpdated) => {
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
                data: categoryUpdated
            })
        })
    }

    delete(req, res) {

        return Category.findByIdAndRemove(req.params.id, (err, categoryDeleted) => {

            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: err
                    })
            }

            if (! categoryDeleted) {
                return res.status(500)
                    .json({
                        success: false,
                        message: "category not found"
                    })
            }

            return res.json({
                success: true,
                message: 'success',
                data: categoryDeleted
            })
        })
    }

}


module.exports = new CategoryController()