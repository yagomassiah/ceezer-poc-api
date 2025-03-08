import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { EmissionEntryEntity } from './emission-entry.entity';

export class EmissionSummaryEntity {
    @ApiProperty({
        description: 'ID of the emission summary',
        required: true,
    })
    @Expose({ name: 'id' })
    id: string;

    @ApiProperty({
        description: 'ID of the user who created the summary',
        required: true,
    })
    @Expose({ name: 'userId' })
    userId: string;

    @ApiProperty({
        description: 'Number of days this emission summary covers',
        required: true,
        example: 30,
    })
    @Expose({ name: 'periodDays' })
    periodDays: number;

    @ApiProperty({
        description: 'Total emissions in kg CO₂e',
        required: true,
        example: 123.45,
    })
    @Expose({ name: 'totalEmissions' })
    totalEmissions: number;

    @ApiProperty({
        description: 'When the summary was created',
        required: true,
    })
    @Expose({ name: 'createdAt' })
    createdAt: Date;

    @ApiProperty({
        description: 'When the summary was last updated',
        required: true,
    })
    @Expose({ name: 'updatedAt' })
    updatedAt: Date;

    @ApiProperty({
        type: () => [EmissionEntryEntity],
        description: 'List of emission entries in this summary',
        required: false,
    })
    @Type(() => EmissionEntryEntity)
    @Expose({ name: 'emissionEntries' })
    emissionEntries?: EmissionEntryEntity[];

    constructor(partial: Partial<EmissionSummaryEntity>) {
        Object.assign(this, partial);
    }
}
