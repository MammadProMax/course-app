const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
   await db.chapter.deleteMany();
}

main().then(() => console.log("done"));
