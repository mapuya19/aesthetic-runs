import dotenv from 'dotenv';
import path from 'path';

// Load environment variables BEFORE importing anything else
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

// Now import and run the app
import('./app').then(({ default: app }) => {
  import('./db/prisma').then(({ prisma }) => {
    const PORT = process.env.PORT || 8000;

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down gracefully...');
      await prisma.$disconnect();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, shutting down gracefully...');
      await prisma.$disconnect();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  });
});
