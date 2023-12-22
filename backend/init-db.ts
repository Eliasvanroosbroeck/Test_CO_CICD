// Execute: npx ts-node init-db.ts

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const main = async () => {
  // Use the prisma API to fill the database with some initial data
  /*await prisma.user.createMany({
    data: [
      {
        name: "User 1",
        mail: "user1@gmail.com",
        password: "t",
        role: "CUSTOMER",
        telNr: "0123123456",
      },
      {
        name: "User 2",
        mail: "user2@gmail.com",
        password: "t",
        role: "ADMIN",
        telNr: "0478123456"
      },
    ],
  })*/
  
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
