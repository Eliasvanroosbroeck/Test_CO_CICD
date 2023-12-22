/*
  Warnings:

  - You are about to drop the `UserEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOrders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYEE', 'CUSTOMER');

-- DropForeignKey
ALTER TABLE "UserEnrollment" DROP CONSTRAINT "UserEnrollment_eventID_fkey";

-- DropForeignKey
ALTER TABLE "UserEnrollment" DROP CONSTRAINT "UserEnrollment_userID_fkey";

-- DropForeignKey
ALTER TABLE "UserOrders" DROP CONSTRAINT "UserOrders_orderID_fkey";

-- DropForeignKey
ALTER TABLE "UserOrders" DROP CONSTRAINT "UserOrders_userID_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToUser" DROP CONSTRAINT "_EventsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToUser" DROP CONSTRAINT "_EventsToUser_B_fkey";

-- DropTable
DROP TABLE "UserEnrollment";

-- DropTable
DROP TABLE "UserOrders";

-- DropTable
DROP TABLE "_EventsToUser";

-- CreateTable
CREATE TABLE "_User_Order" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_User_Events" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_User_Order_AB_unique" ON "_User_Order"("A", "B");

-- CreateIndex
CREATE INDEX "_User_Order_B_index" ON "_User_Order"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_User_Events_AB_unique" ON "_User_Events"("A", "B");

-- CreateIndex
CREATE INDEX "_User_Events_B_index" ON "_User_Events"("B");

-- AddForeignKey
ALTER TABLE "_User_Order" ADD CONSTRAINT "_User_Order_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_Order" ADD CONSTRAINT "_User_Order_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_Events" ADD CONSTRAINT "_User_Events_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("eventid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_Events" ADD CONSTRAINT "_User_Events_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
