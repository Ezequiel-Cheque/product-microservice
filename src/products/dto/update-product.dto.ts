import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNumber()
    @IsPositive()
    id: number;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public price: number;
}
