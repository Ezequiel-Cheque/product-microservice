import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    public name: string;

    @ApiProperty()
    @IsNumber({
        maxDecimalPlaces: 4
    })
    @Min(0)
    @Type(() => Number)
    public price: number;

}
