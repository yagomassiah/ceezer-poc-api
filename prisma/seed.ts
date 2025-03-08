import { PrismaClient, CategoryType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clean up existing data first
    await prisma.emissionEntry.deleteMany();
    await prisma.emissionSummary.deleteMany();
    await prisma.user.deleteMany();
    await prisma.emissionCategory.deleteMany();

    // Create admin user with hardcoded UUID
    await prisma.user.create({
        data: {
            id: 'ceezerAdminFakeUuid',
            email: 'admin@ceezer.com',
            password: 'admin123',
        },
    });

    // Transportation categories
    const transportCategories = [
        {
            id: 'gasolineCarFakeUuid',
            name: 'Gasoline Car',
            type: CategoryType.TRANSPORTATION,
            coefficient: 0.21,
            unit: 'KM',
        },
        {
            id: 'electricCarFakeUuid',
            name: 'Electric Car',
            type: CategoryType.TRANSPORTATION,
            coefficient: 0.1,
            unit: 'KM',
        },
        {
            id: 'airplaneFakeUuid',
            name: 'Airplane (economy)',
            type: CategoryType.TRANSPORTATION,
            coefficient: 0.1,
            unit: 'KM',
        },
        {
            id: 'trainFakeUuid',
            name: 'Train',
            type: CategoryType.TRANSPORTATION,
            coefficient: 0.04,
            unit: 'KM',
        },
        {
            id: 'walkingBikingFakeUuid',
            name: 'Walking/Biking',
            type: CategoryType.TRANSPORTATION,
            coefficient: 0.0,
            unit: 'KM',
        },
    ];

    // Energy use categories
    const energyCategories = [
        {
            id: 'electricityFakeUuid',
            name: 'Electricity',
            type: CategoryType.ENERGY_USE,
            coefficient: 0.4,
            unit: 'KWH',
        },
        {
            id: 'naturalGasFakeUuid',
            name: 'Natural Gas',
            type: CategoryType.ENERGY_USE,
            coefficient: 2.2,
            unit: 'M3',
        },
        {
            id: 'heatingOilFakeUuid',
            name: 'Heating Oil',
            type: CategoryType.ENERGY_USE,
            coefficient: 2.5,
            unit: 'LITER',
        },
        {
            id: 'solarEnergyFakeUuid',
            name: 'Solar Energy',
            type: CategoryType.ENERGY_USE,
            coefficient: 0.0,
            unit: 'KWH',
        },
    ];

    // Food consumption categories
    const foodCategories = [
        {
            id: 'beefFakeUuid',
            name: 'Beef',
            type: CategoryType.FOOD_CONSUMPTION,
            coefficient: 27,
            unit: 'KG',
        },
        {
            id: 'chickenFakeUuid',
            name: 'Chicken',
            type: CategoryType.FOOD_CONSUMPTION,
            coefficient: 6.9,
            unit: 'KG',
        },
        {
            id: 'vegetablesFakeUuid',
            name: 'Vegetables',
            type: CategoryType.FOOD_CONSUMPTION,
            coefficient: 1,
            unit: 'KG',
        },
    ];

    // Combine all categories
    const allCategories = [
        ...transportCategories,
        ...energyCategories,
        ...foodCategories,
    ];

    // Create all categories
    for (const category of allCategories) {
        await prisma.emissionCategory.create({
            data: category,
        });
    }

    console.log(`Created ${allCategories.length} emission categories`);
    console.log('Created admin user with id: ceezerAdminFakeUuid');
}

void main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        void prisma.$disconnect();
    });
