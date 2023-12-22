/*
  Warnings:

  - You are about to drop the column `cocktailid` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cocktailid_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cocktailid";

-- CreateTable
CREATE TABLE "_Order_Cocktail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Order_Cocktail_AB_unique" ON "_Order_Cocktail"("A", "B");

-- CreateIndex
CREATE INDEX "_Order_Cocktail_B_index" ON "_Order_Cocktail"("B");

-- AddForeignKey
ALTER TABLE "_Order_Cocktail" ADD CONSTRAINT "_Order_Cocktail_A_fkey" FOREIGN KEY ("A") REFERENCES "Cocktail"("cocktailid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Order_Cocktail" ADD CONSTRAINT "_Order_Cocktail_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;
