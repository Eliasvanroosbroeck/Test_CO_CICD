/*
  Warnings:

  - You are about to drop the column `orderid` on the `Cocktail` table. All the data in the column will be lost.
  - Added the required column `cocktailid` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cocktail" DROP CONSTRAINT "Cocktail_orderid_fkey";

-- AlterTable
ALTER TABLE "Cocktail" DROP COLUMN "orderid";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cocktailid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cocktailid_fkey" FOREIGN KEY ("cocktailid") REFERENCES "Cocktail"("cocktailid") ON DELETE RESTRICT ON UPDATE CASCADE;
