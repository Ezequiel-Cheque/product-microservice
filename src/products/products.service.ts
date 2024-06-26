import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{
  
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    
    const total = await this.product.count();
    const lastPage = Math.ceil(total / limit);
    const data = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { available: true }
    });

    return {
     data: data,
     metadata: {
        page: page,
        total: total,
        lastPage: lastPage
     } 
    };
  }

  async findOne(id: number) {
    const data = await this.product.findUnique({
      where: {
        id: id,
        available: true
      }
    });

    if (!data) {
      // throw new RpcException(`Product with id: ${id} not found`);
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }

    return data;
  }

  async update(updateProductDto: UpdateProductDto) {
    
    const { id , ...rest } = updateProductDto;

    const find = await this.product.findUnique({ where: {id, available: true} }) 
    if (!find) {
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    const data = await this.product.update({
      where: {id},
      data:rest
    });

    return data;
  }

  async remove(id: number) {
    const find = await this.product.findUnique({ where: {id, available: true} }) 
    if (!find) {
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    const data = await this.product.update({
      where: {id},
      data: {
        available: false
      }
    });
    
    return data;
    // return this.product.delete({ where: {id} });
  }
}
