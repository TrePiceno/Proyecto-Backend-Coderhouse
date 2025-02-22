import fs from 'fs';
import __dirname from '../utils.js';

class CartManager {

    constructor() {
        this.filePath = __dirname + '/fileSystem/cart.json';
    }

    async createCart(cart) {
        try {
            let carts = await this.getCarts();
            carts.push({ id: carts.length + 1, ...cart });
            
            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            console.log("Carrito creado exitosamente");
        } catch (error) {
            console.error("Error al crear el carrito: ", error)
        }
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            console.error("Error al leer los carritos: ", error)
        }
    }

    async addProductsCart(cartId, productId) {
        try {
            let carts = await this.getCarts();
            let carrito = carts.find(carrito => carrito.id === cartId);
            
            if (!carrito) {
                carrito = { cartId, arrayProducts: [] };
                carts.push(carrito);
            }
            
            let producto = carrito.arrayProducts.find(producto => producto.productId === productId);

            if (producto) {
                producto.cantidad++;
            } else {
                carrito.arrayProducts.push({ productId, cantidad: 1 });
            }


            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            return carts;

        } catch (error) {
            console.error("Error al añadir productos al carrito: ", error);
        }
    }

    // Método que elimine el carrito y pasarlo al cart.router.También lo elimine del cart.json

}

export default CartManager;