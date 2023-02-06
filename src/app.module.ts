import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from './presentation/presentation.module';
import { UsersModule } from './users/users.module';
import { LangagesModule } from './langages/langages.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{ .ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    LangagesModule,
    PresentationModule,UsersModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
