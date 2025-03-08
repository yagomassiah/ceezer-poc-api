import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmissionSummaryDto } from '@/controllers/emissions/dto/create-emission-summary.dto';
import { EmissionSummary } from '@prisma/client';

// Hey Ceezer team, one of the first few things that happens when we create a service is that we end up adding a bunch
// of responsibilities to it, and that's not a bad thing necessarily, but it's important to keep in mind that as the system grows
// we might need to separate calculation and data access responsibilities, for a small system like this it's not a big deal,
// and it can actually make the code easier to maintain if we don't spread out the flow in multiple classes when a process is simple enough.

@Injectable()
export class EmissionsService {
    constructor(private prisma: PrismaService) {}

    async createEmissionSummary(
        data: CreateEmissionSummaryDto,
    ): Promise<EmissionSummary> {
        // First, calculate total emissions from all entries
        let totalEmissions = 0;

        // Create the emission summary
        const summary = await this.prisma.emissionSummary.create({
            data: {
                userId: data.userId,
                periodDays: data.periodDays,
                totalEmissions: 0, // We'll update this after creating entries
            },
        });

        // Create all emission entries and calculate total emissions
        for (const entry of data.entries) {
            // Get the category to access its coefficient
            const category = await this.prisma.emissionCategory.findUnique({
                where: { id: entry.categoryId },
            });

            if (!category) {
                throw new Error(
                    `Category with ID ${entry.categoryId} not found`,
                );
            }

            // Calculate emissions for this entry
            const emissions = entry.value * category.coefficient;
            totalEmissions += emissions;

            // Create the emission entry
            await this.prisma.emissionEntry.create({
                data: {
                    categoryId: entry.categoryId,
                    value: entry.value,
                    emissions: emissions,
                    unit: entry.unit,
                    emissionSummaryId: summary.id,
                },
            });
        }

        // Update the total emissions in the summary
        const updatedSummary = await this.prisma.emissionSummary.update({
            where: { id: summary.id },
            data: { totalEmissions },
            include: {
                emissionEntries: true,
            },
        });

        return updatedSummary;
    }

    async getEmissionSummary(id: string): Promise<EmissionSummary> {
        return this.prisma.emissionSummary.findUnique({
            where: { id },
            include: {
                emissionEntries: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }

    async getUserEmissionSummaries(userId: string): Promise<EmissionSummary[]> {
        return this.prisma.emissionSummary.findMany({
            where: { userId },
            include: {
                emissionEntries: {
                    include: {
                        category: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
