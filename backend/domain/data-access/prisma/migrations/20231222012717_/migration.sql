/*
  Warnings:

  - You are about to drop the `_Order_Cocktail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Cocktail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Order_Cocktail" DROP CONSTRAINT "_Order_Cocktail_A_fkey";

-- DropForeignKey
ALTER TABLE "_Order_Cocktail" DROP CONSTRAINT "_Order_Cocktail_B_fkey";

-- AlterTable
ALTER TABLE "Cocktail" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "ingredients" SET NOT NULL,
ALTER COLUMN "ingredients" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "duration" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_Order_Cocktail";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "CocktailOrder" (
    "cocktailid" INTEGER NOT NULL,
    "orderid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "CocktailOrder_pkey" PRIMARY KEY ("cocktailid","orderid")
);

-- AddForeignKey
ALTER TABLE "CocktailOrder" ADD CONSTRAINT "CocktailOrder_cocktailid_fkey" FOREIGN KEY ("cocktailid") REFERENCES "Cocktail"("cocktailid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CocktailOrder" ADD CONSTRAINT "CocktailOrder_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "Order"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;
