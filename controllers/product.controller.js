import Product from '../models/product.model.js';

// Get all Products
function getProducts(req, res) {
    Product.find()
        .then((allProduct) => {
            return res.status(200).json(allProduct);
            // return res.status(200).json({
            //     success: true,
            //     message: 'List of all Products',
            //     product: allProduct,
            // });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });

}

// Create new Product
function createProduct(req, res) {
    const { reference, name, description, image, price } = req.body;

    // Check input type
    let inputValidation = checkProductValidity(req.body)

    if (inputValidation) return res.status(422).json({
        message: inputValidation
    });

    const product = new Product({
        reference: reference,
        name: name,
        description: description,
        // image: image,
        price: price
    });

    return product
        .save()
        .then((newProduct) => {
            return res.status(201).json({
                success: true,
                message: 'New Product created successfully',
                Product: newProduct,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

// get single product
function getSingleProduct(req, res) {
    const id = req.params.productId;
    Product.findById(id)
        .then((singleProduct) => {
            res.status(200).json(singleProduct);
            // res.status(200).json({
            //     success: true,
            //     message: `Details for ${singleProduct?.name}`,
            //     Product: singleProduct,
            // });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This product does not exist',
                error: err.message,
            });
        });
}

// update product
function updateProduct(req, res) {
    const id = req.params.productId;
    const updateObject = req.body;

    // Check input type
    let inputValidation = checkProductValidity(req.body)
    if (inputValidation) return res.status(422).json({
        message: inputValidation
    });

    Product.updateOne({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Product is updated',
                updateProduct: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

// delete a product
function deleteProduct(req, res) {
    const id = req.params.productId;
    Product.findByIdAndRemove(id)
        .exec()
        .then(() => res.status(202).json({
            success: true,
            message: 'Product is deleted',

        }))
        .catch((err) => res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        }));
}

// delete all products
function deleteAllProduct(req, res) {
    Product.deleteMany({})
        .exec()
        .then(() => res.status(202).json({
            success: true,
            message: 'All products are deleted',

        }))
        .catch((err) => res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        }));
}

// search for a product
function searchForProduct(req, res) {
    const name = req.params.productName;
    Product.find(name ? { name: { $regex: new RegExp(name) } } : {})
        .then((products) => {
            res.status(200).json(products);
            // res.status(200).json({
            //     success: true,
            //     message: `Results for ${name}`,
            //     Product: products,
            // });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'No such product with the name ' + name,
                error: err.message,
            });
        });
}

// Check for input validity (type and empteness)
function checkProductValidity({ reference, name, description, image, price }) {
    let invalidInput = []

    if (typeof reference != 'string' || !reference) {
        invalidInput.push("reference")
    }
    if (typeof name != 'string' || !name) {
        invalidInput.push("name")
    }
    if (typeof description != 'string' || !description) {
        invalidInput.push("description")
    }
    // if (typeof image != 'string' || !image) {
    //     invalidInput.push("image")
    // }
    if (typeof price != 'number' || !price) {
        invalidInput.push("price")
    }

    return invalidInput.length == 0 ? null : "Invalid or empty inputs provided at: " + invalidInput.join(', ')
}

export { getProducts, createProduct, getSingleProduct, updateProduct, deleteProduct, deleteAllProduct, searchForProduct }