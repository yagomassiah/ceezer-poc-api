import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { EmissionCategoryEntity } from './emission-category.entity';

export class EmissionEntryEntity {
    @ApiProperty({
        description: 'ID of the emission entry',
        required: true,
    })
    @Expose({ name: 'id' })
    id: string;

    @ApiProperty({
        description:
            'Value of the emission (e.g., kilometers driven, kWh used)',
        required: true,
        example: 100,
    })
    @Expose({ name: 'value' })
    value: number;

    @ApiProperty({
        description: 'Unit of measurement (KM, KWH, M3, etc.)',
        required: true,
        example: 'KM',
    })
    @Expose({ name: 'unit' })
    unit: string;

    @ApiProperty({
        description: 'Calculated emissions in kg CO₂e',
        required: true,
        example: 21,
    })
    @Expose({ name: 'emissions' })
    emissions: number;

    @ApiProperty({
        description: 'ID of the emission category',
        required: true,
    })
    @Expose({ name: 'categoryId' })
    categoryId: string;

    @ApiProperty({
        type: () => EmissionCategoryEntity,
        description: 'Category details of the emission',
        required: false,
    })
    @Type(() => EmissionCategoryEntity)
    @Expose({ name: 'category' })
    category?: EmissionCategoryEntity;

    constructor(partial: Partial<EmissionEntryEntity>) {
        Object.assign(this, partial);
    }
}
