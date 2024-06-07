import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        required: false,
        default: 1
    })
    @IsPositive()
    @IsOptional()
    @Type(()=>Number)
    page?: number = 1;

    @ApiProperty({
        required: false,
        default: 10
    })
    @IsPositive()
    @IsOptional()
    @Type(()=>Number)
    limit?: number = 10;
}