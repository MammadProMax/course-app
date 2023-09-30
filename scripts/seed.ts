const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();
async function main() {
   try {
      await database.category.createMany({
         data: [
            { name: "Computer Science" },
            { name: "Music" },
            { name: "Fitness" },
            { name: "Photography" },
            { name: "Accounting" },
            { name: "Engineering" },
            { name: "Filming" },
         ],
      });
      console.log("success");
   } catch (error) {
      console.log(error);
   }
}

main()
   .then(() => console.log("query is done"))
   .finally(() => database.$disconnect());
