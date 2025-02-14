import { Router } from 'express';
import ProductManager from '../fileSystem/productsManager.js';

const router = Router();
const productManager = new ProductManager();
let products = await productManager.getProducts();

router.get('/', (req, res) => {
    let limit = parseInt(req.query.limit);

    if (!limit) {
        return res.json({ products });
    }

    let productosAMostrar = products.slice(0, limit);
    return res.json({ productosAMostrar });
})

router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(product => product.id === productId);
    if (!product) {
        return res.status(404).send({ status: "error", error: "User not found" });
    }
    res.json({ product });
})

router.post('/', (req, res) => {
    const newProduct = req.body;
    products.push({ id: products.length + 1, ...newProduct });

    productManager.createProduct( req.body );
    res.status(201).json({ message: "Nuevo producto creado exitosamente" });
})


router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        return res.status(404).send({ status: "error", error: "User not found" });
    }

    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.send({ status: "success", message: "User updated" });
})

router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).send({ status: "error", error: "User not found" });
    }

    products.splice(productIndex, 1);
    res.send({ status: "success", message: "User delete" });
})

export default router;