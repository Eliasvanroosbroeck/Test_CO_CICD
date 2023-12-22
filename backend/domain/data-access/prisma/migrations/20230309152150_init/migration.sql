-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYEE', 'CUSTOMER');

-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "telNr" INTEGER NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Cocktail" (
    "cocktailid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" TEXT[],
    "orderid" INTEGER NOT NULL,

    CONSTRAINT "Cocktail_pkey" PRIMARY KEY ("cocktailid")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderid" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderid")
);

-- CreateTable
CREATE TABLE "Events" (
    "eventid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "maxUsers" INTEGER NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "UserEnrollment" (
    "attended" TEXT NOT NULL DEFAULT 'No',
    "userID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,

    CONSTRAINT "UserEnrollment_pkey" PRIMARY KEY ("userID","eventID")
);

-- CreateTable
CREATE TABLE "_EventsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToUser_AB_unique" ON "_EventsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToUser_B_index" ON "_EventsToUser"("B");

-- AddForeignKey
ALTER TABLE "Cocktail" ADD CONSTRAINT "Cocktail_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "Order"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEnrollment" ADD CONSTRAINT "UserEnrollment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEnrollment" ADD CONSTRAINT "UserEnrollment_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Events"("eventid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUser" ADD CONSTRAINT "_EventsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("eventid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUser" ADD CONSTRAINT "_EventsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
