import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.products.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }
  @Get()
  getAllProducts() {
    return this.products.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.products.getProductById(prodId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.products.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  }
}
