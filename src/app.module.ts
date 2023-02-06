import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CompetencesModule } from './competences/competences.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    synchronize: true,
  }),
  ConfigModule.forRoot(),
  AuthModule,
  CompetencesModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
