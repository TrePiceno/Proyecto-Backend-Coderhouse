import { Router } from 'express';
import ProductManager from '../fileSystem/productsManager.js';

const router = Router();
const productManager = new ProductManager();
let products = await productManager.getProducts();


router.get('/', (req, res) => {

    try {

        let limit = parseInt(req.query.limit);

        if (!limit) {
            return res.json({ products });
        };

        let productosAMostrar = products.slice(0, limit);
        return res.json({ productosAMostrar });


    } catch (error) {
        console.error("Error al traer los productos: ", error);
    };

});

router.get('/:id', (req, res) => {

    try {

        const productId = parseInt(req.params.id);
        const product = products.find(product => product.id === productId);
        if (!product) {
            return res.status(404).send({ status: "error", error: `Producto con id: ${productId} no encontrado` });
        }
        res.json({ product });

    } catch (error) {
        console.error("Error al traer el producto: ", error);
    };
});


router.post('/', (req, res) => {

    try {

        const newProduct = req.body;
        products.push({ id: products.length + 1, ...newProduct });
    
        productManager.createProduct( req.body );
        res.status(201).json({ message: "Nuevo producto creado exitosamente" });

    } catch (error) {
        console.error("Error al crear el producto: ", error);
    };
    
});


router.put('/:id', (req, res) => {

    try {

        const productId = parseInt(req.params.id);
        const updatedProduct = req.body;
        const productIndex = products.findIndex(product => product.id === productId);
    
        if (productIndex === -1) {
            return res.status(404).send({ status: "error", error: "Producto no encontrado" });
        };
    
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        res.send({ status: "success", message: "Producto actualizado" });

    } catch (error) {
        console.error("Error al actualizar el producto: ", error);
    };
});

router.delete('/:id', (req, res) => {

    try {
        
        const productId = parseInt(req.params.id);
        const productIndex = products.findIndex(product => product.id === productId);
        
        if (productIndex === -1) {
            return res.status(404).send({ status: "error", error: `Producto con id: ${productId} no encontrado` });
        };
    
        products.splice(productIndex, 1);
        res.send({ status: "success", message: "Producto eliminado" });

    } catch (error) {
        console.error("Error al eliminar el producto: ", error);
    };
    
});

export default router;