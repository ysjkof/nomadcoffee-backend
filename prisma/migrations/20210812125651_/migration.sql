/*
  Warnings:

  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShop" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
