const prisma = require('./prisma');
require("dotenv").config();

async function dbConnect() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to PostgreSQL via Prisma!");
  } catch (error) {
    console.log("Unable to connect to database!");
    console.error(error);
    process.exit(1);
  }
}

module.exports = dbConnect;
