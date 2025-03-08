import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEmissionEntryDto } from './create-emission-entry.dto';

export class CreateEmissionSummaryDto {
    @ApiProperty({
        description: 'ID of the user creating the emission summary',
        example: '1a2b3c4d-5e6f-7g8h-9i0j-a1b2c3d4e5f6',
    })
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Number of days this emission summary covers',
        example: 30,
        minimum: 1,
    })
    @IsInt()
    @Min(1)
    periodDays: number;

    @ApiProperty({
        description: 'List of emission entries',
        type: [CreateEmissionEntryDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateEmissionEntryDto)
    entries: CreateEmissionEntryDto[];
}
