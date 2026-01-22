const { Router } = require('express');
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager('./data/products.json');

const router = Router();

router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

module.exports = router;

