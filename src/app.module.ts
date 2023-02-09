import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from './presentation/presentation.module';
import { UsersModule } from './users/users.module';
import { LangagesModule } from './langages/langages.module';
import { CompetencesModule } from './competences/competences.module';
import 'reflect-metadata';
import { AuthModule } from './auth/auth.module';
import { ProfilModule } from './profil/profil.module';
import { SearchModule } from './search/search.module';
import { FriendsModule } from './friends/friends.module';

@Module({
        imports: [
                ConfigModule.forRoot({ envFilePath: '.env' }),
                TypeOrmModule.forRoot({
                        type: 'postgres',
                        host: process.env.DB_HOST,
                        port: 5432,
                        username: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        entities: ['dist/**/*.entity{ .ts,.js}'],
                        synchronize: true,
                        logging: true,
                }),

                LangagesModule,
                PresentationModule,
                UsersModule,
                ProfilModule,
                SearchModule,
                FriendsModule,
                CompetencesModule,
                AuthModule,
        ],

        controllers: [AppController],
        providers: [AppService],
})
export class AppModule {}
