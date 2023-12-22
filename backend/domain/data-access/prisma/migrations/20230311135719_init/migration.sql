/*
  Warnings:

  - You are about to drop the `_User_Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_User_Order" DROP CONSTRAINT "_User_Order_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_Order" DROP CONSTRAINT "_User_Order_B_fkey";

-- DropTable
DROP TABLE "_User_Order";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
