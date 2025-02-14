import fs from 'fs';

class CartManager {

    constructor() {
        this.filePath = './src/fileSystem/cart.json';
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

    async addProductsCart(carrito, cartIndex) {
        try {
            let carts = await this.getCarts();
            let arrayCart = carts[cartIndex];

            if (!arrayCart) {
                throw new Error("El carrito no existe");
            }

            let productosFiltrados = carrito.filter(p => p.producto && !isNaN(p.producto) && p.cantidad > 0);
            console.log(productosFiltrados);

            let productosAgrupados = productosFiltrados.reduce((acc, producto) => {
                let id = producto.producto;
                acc[id] = (acc[id] || 0) + producto.cantidad;
                return acc;
            }, {});

            Object.entries(productosAgrupados).forEach(([id, cantidad]) => {
                let productoId = Number(id);

                let productoExistente = arrayCart.arrayProducts.find(prod => prod.producto === productoId);

                if (productoExistente) {
                    productoExistente.cantidad += cantidad;
                } else {
                    arrayCart.arrayProducts.push({ producto: productoId, cantidad });
                }
            });

            carts[cartIndex] = { ...arrayCart };

            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            return carts;
        } catch (error) {
            console.error("Error al añadir productos al carrito: ", error);
        }
    }
}

export default CartManager;