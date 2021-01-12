const Product = require('../models/Product')
class ProductController {
    index(req, res) {
        let from = Number(req.query.from) || 0;
        let limit = Number(req.query.to) || 10

        return Product.find({available: true})
            .skip(from)
            .limit(limit)
            .populate('User','name email')
            .populate('Category','description')
            .exec((err, products) => {
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
                    data: products
                })
            })


    }

    show(req, res) {
        return Product.findById(req.params.id)
            .populate('User','name email')
            .populate('Category','description')
            .exec((err, product) => {
                if (err) {
                    return res.status(500)
                        .json({
                            success: false,
                            message: err
                        })
                }

                if (! product) {
                    return res.status(500)
                        .json({
                            success: false,
                            message: 'Product not found'
                        })
                }

                return res.json({
                    success: true,
                    message: 'success',
                    data: product
                })
            })
    }

    search(req, res) {
        let keyword = req.params.keyword;
        let regex = new RegExp(keyword, 'i')

        Product.find( { name: regex })
            .populate('User','name email')
            .populate('Category','description')
            .exec((err, product) => {
                if (err) {
                    return res.status(500)
                        .json({
                            success: false,
                            message: err
                        })
                }

                if (! product) {
                    return res.status(500)
                        .json({
                            success: false,
                            message: 'Product not found'
                        })
                }

                return res.json({
                    success: true,
                    message: 'success',
                    data: product
                })
            })


    }

    store(req, res){
        let {description, name, price_unit, category, available} = req.body

        let product = new Product( {
            description,
            name,
            price_unit,
            category,
            available,
            user: req.user._id
        })
        return product.save( ( err, productCreated) => {
            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: err
                    })
            }
            return res.status(201).json({
                success: true,
                message: 'success',
                data: productCreated
            })
        })
    }
    update(req, res){
        const id = req.params.id
        let {description, name, price_unit, category, available} = req.body

        let body = {
            description,
            name,
            price_unit,
            category,
            available,
            user: req.user._id
        }

        return Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: 'query'
        }, (err, productUpdated) => {
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
                data: productUpdated
            })
        })
    }

    delete(req, res) {

        return Product.findByIdAndUpdate(req.params.id, {available: false}, {
            new: true
        }, (err, productUpdated) => {
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
                data: productUpdated
            })
        })
    }

}


module.exports = new ProductController()