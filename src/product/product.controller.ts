import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ObjectIdPipe } from 'src/commons/pipes/objectid.pipe';

import { User } from 'src/user/schema/user.schema';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { ProductDocument } from './schema/product.schema';

@ApiTags('PRODUCT')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create product by user' })
  async create(@Req() req: Request, @Body() body: CreateProductDTO) {
    const { _id } = req.user as User;
    return this.productService.create(body, _id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List product by user' })
  async getAll(@Req() req: Request): Promise<ProductDocument[]> {
    const { _id } = req.user as User;
    return this.productService.getAll(_id);
  }

  @Put(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update product by user' })
  async update(
    @Req() req: Request,
    @Body() body: UpdateProductDTO,
    @Param('productId', ObjectIdPipe) productId: string,
  ) {
    const { _id } = req.user as User;
    return this.productService.update(productId, body, _id);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove product by user' })
  async remove(
    @Req() req: Request,
    @Param('productId', ObjectIdPipe) productId: string,
  ) {
    const { _id } = req.user as User;
    const deleted = await this.productService.remove(productId, _id);
    return deleted ? 'Product deleted' : 'The product could not be deleted';
  }
}
