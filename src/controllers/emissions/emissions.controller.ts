import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    Get,
    Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmissionsService } from '@/services/emissions.service';
import { CreateEmissionSummaryDto } from './dto/create-emission-summary.dto';
import { EmissionSummaryEntity } from './entity/emission-summary.entity';

@ApiTags('Emissions')
@Controller('emissions')
export class EmissionsController {
    constructor(private readonly emissionsService: EmissionsService) {}

    @ApiOperation({
        summary: 'Create an emission summary',
        description:
            'Create a new emission summary with multiple emission entries for different categories',
    })
    @ApiResponse({
        status: 201,
        description: 'The emission summary has been successfully created',
        type: EmissionSummaryEntity,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data or emission category not found',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })
    @Post()
    async createEmissionSummary(
        @Body() createEmissionSummaryDto: CreateEmissionSummaryDto,
    ): Promise<EmissionSummaryEntity> {
        try {
            const summary = await this.emissionsService.createEmissionSummary(
                createEmissionSummaryDto,
            );
            return new EmissionSummaryEntity(summary);
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Error creating emission summary',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @ApiOperation({
        summary: 'Get all emission summaries for a user',
        description:
            'Retrieve all emission summaries with their entries for a specific user',
    })
    @ApiResponse({
        status: 200,
        description: 'List of emission summaries for the user',
        type: [EmissionSummaryEntity],
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })
    @Get('user/:userId')
    async getUserEmissionSummaries(
        @Param('userId') userId: string,
    ): Promise<EmissionSummaryEntity[]> {
        try {
            const summaries =
                await this.emissionsService.getUserEmissionSummaries(userId);

            return summaries.map(
                (summary) => new EmissionSummaryEntity(summary),
            );
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Error fetching user emission summaries',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
