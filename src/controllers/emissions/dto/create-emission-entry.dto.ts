import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { UnitType } from '@prisma/client';

export class CreateEmissionEntryDto {
    @ApiProperty({
        description: 'ID of the emission category',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
    })
    @IsString()
    categoryId: string;

    @ApiProperty({
        description:
            'Value of the emission (e.g., kilometers driven, kWh used)',
        example: 100,
    })
    @IsNumber()
    value: number;

    @ApiProperty({
        enum: UnitType,
        enumName: 'UnitType',
        description: 'Unit of measurement (KM, KWH, M3, etc.)',
        example: 'KM',
    })
    @IsEnum(UnitType, { message: 'Invalid unit type' })
    unit: string;
}
