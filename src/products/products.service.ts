import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
  getAllProducts() {
    return [...this.products];
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (prod) => prod.id === productId,
    );
    const product = this.products[productIndex];
    if (!product)
      throw new NotFoundException('failed to found item with id', productId);
    return [product, productIndex];
  }
  getProductById(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }
  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);

    this.products[index] = {
      ...product,
      title,
      description: desc,
      price,
    };
  }
}
