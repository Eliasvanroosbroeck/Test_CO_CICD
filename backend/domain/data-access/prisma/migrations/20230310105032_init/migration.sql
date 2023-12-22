-- CreateTable
CREATE TABLE "UserOrders" (
    "userID" INTEGER NOT NULL,
    "orderID" INTEGER NOT NULL,

    CONSTRAINT "UserOrders_pkey" PRIMARY KEY ("userID","orderID")
);

-- AddForeignKey
ALTER TABLE "UserOrders" ADD CONSTRAINT "UserOrders_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrders" ADD CONSTRAINT "UserOrders_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;
