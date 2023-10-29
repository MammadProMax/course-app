// const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function Xmain() {
   await db.chapter.deleteMany();
}

Xmain().then(() => console.log("done"));
