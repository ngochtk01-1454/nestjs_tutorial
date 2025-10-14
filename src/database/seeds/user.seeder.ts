import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';

export class UserSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    // Check if users already exist
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      console.log('✅ Users already exist, skipping seed...');
      return;
    }

    console.log('🌱 Seeding users...');

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('password123', saltRounds);

    try {
      const user = {
        name: 'Test User',
        email: 'test.user@example.com',
        password: hashedPassword,
      };
      
      // Save
      await userRepository.save([user]);

      console.log('✅ Seeded 1 user successfully!');

    } catch (error) {
      console.error('❌ Error seeding users:', error);
      throw error;
    }
  }
}
