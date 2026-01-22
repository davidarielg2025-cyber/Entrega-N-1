const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id == id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = { id: Date.now(), ...product };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...updatedFields, id: products[index].id };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(p => p.id != id);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;
