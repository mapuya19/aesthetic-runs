import prisma from './prisma';
import dotenv from 'dotenv';

dotenv.config();

async function dbConnect(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL via Prisma!');
  } catch (error) {
    console.log('Unable to connect to database!');
    console.error(error);
    process.exit(1);
  }
}

export default dbConnect;
