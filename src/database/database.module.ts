import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
      autoLoadEntities: true,
      synchronize: false, // Keep false for production safety
    }),
  ],
})
export class DatabaseModule {}
