import fs from 'fs';

class ProductManager {

    constructor() {
        this.filePath = './src/fileSystem/products.json';
    }

    async createProduct(product) {
        try {

            let products = await this.getProducts();
            products.push({ id: products.length + 1, ...product });

            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2)); 
            console.log("Producto creado exitosamente");

        } catch (error) {

            console.error("Error al crear producto: ", error)

        }
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error("Error al leer los productos: ", error)
        }
    }
}

export default ProductManager;