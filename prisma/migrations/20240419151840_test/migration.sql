/*
  Warnings:

  - Added the required column `categoryId` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `Expenses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_userId_fkey";

-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "amount" SET NOT NULL;
