import 'dotenv/config';
import { DataSource } from 'typeorm';
import dataSource from '../../config/typeorm.config';
import { UserSeeder } from './user.seeder';

async function runSeeders() {
  console.log('🌱 Starting seeders...');
  
  try {
    // Initialize database connection
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('🗄️  Database connected successfully!');
    }

    // Run User seeder
    const userSeeder = new UserSeeder();
    await userSeeder.run(dataSource);

    console.log('🎉 All seeders completed successfully!');
    
  } catch (error) {
    console.error('❌ Error running seeders:', error);
    process.exit(1);
    
  } finally {
    // Close database connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔒 Database connection closed.');
    }
    process.exit(0);
  }
}

// Run seeders
runSeeders();
