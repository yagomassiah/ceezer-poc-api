import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CategoryType } from '@prisma/client';

export class EmissionCategoryEntity {
    @ApiProperty({
        description: 'ID of the emission category',
        required: true,
    })
    @Expose({ name: 'id' })
    id: string;

    @ApiProperty({
        description: 'Name of the category',
        required: true,
        example: 'Gasoline Car',
    })
    @Expose({ name: 'name' })
    name: string;

    @ApiProperty({
        description: 'Type of the category',
        required: true,
        enum: CategoryType,
        example: 'TRANSPORTATION',
    })
    @Expose({ name: 'type' })
    type: CategoryType;

    @ApiProperty({
        description: 'Emission coefficient (kg CO₂e per unit)',
        required: true,
        example: 0.21,
    })
    @Expose({ name: 'coefficient' })
    coefficient: number;

    @ApiProperty({
        description: 'Standard unit for this category',
        required: true,
        example: 'KM',
    })
    @Expose({ name: 'unit' })
    unit: string;

    constructor(partial: Partial<EmissionCategoryEntity>) {
        Object.assign(this, partial);
    }
}
