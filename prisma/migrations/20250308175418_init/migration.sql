-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('TRANSPORTATION', 'ENERGY_USE', 'FOOD_CONSUMPTION');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('KM', 'KWH', 'M3', 'LITER', 'KG');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_summaries" (
    "id" TEXT NOT NULL,
    "periodDays" INTEGER NOT NULL,
    "totalEmissions" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "emission_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_entries" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "emissions" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emissionSummaryId" TEXT NOT NULL,

    CONSTRAINT "emission_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "emission_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "emission_summaries" ADD CONSTRAINT "emission_summaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_entries" ADD CONSTRAINT "emission_entries_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "emission_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_entries" ADD CONSTRAINT "emission_entries_emissionSummaryId_fkey" FOREIGN KEY ("emissionSummaryId") REFERENCES "emission_summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
