import { Router } from 'express';
import CartManager from '../fileSystem/cartManager.js';
import ProductManager from '../fileSystem/productsManager.js';

const router = Router();
const cartManager = new CartManager();
let carts = await cartManager.getCarts();
const productManager = new ProductManager();
let products = await productManager.getProducts();


router.get('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    const cart = carts.find(cart => cart.id === cartId);

    if (!cart) {
        return res.status(404).send({ status: "error", error: "User not found" });
    }
    
    res.json({ cart });
});


router.post('/', (req, res) => {
    const newCart = req.body;
    carts.push({ id: carts.length + 1, ...newCart });

    cartManager.createCart(req.body);
    res.status(201).json({ message: "Nuevo carrito creado exitosamente" });
})


router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid);

    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
        return res.status(404).send({ status: "error", error: "Producto no encontrado" });
    }

    const cartIndex = carts.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
        return res.status(404).send({ status: "error", error: "Carrito no encontrado" });
    }

    let producto = products[productIndex].id;
    let carrito = carts[cartIndex].arrayProducts;
    
    carrito.push(producto);
    
    if (producto) {
        carrito = Object.values(
            carrito.reduce((contador, producto) => {
                if (!contador[producto]) {
                    contador[producto] = { producto: producto, cantidad: 0 };
                }
                contador[producto].cantidad++;
                return contador;
            }, {})
        );
    }

    cartManager.addProductsCart(cartId, productId);
    res.status(201).json({ message: "Producto añadido al carrito exitosamente" });
})

export default router;