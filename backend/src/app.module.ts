import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';
import { TransactionModule } from './modules/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationGuard } from './guard/authentication/authentication.guard';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
      {
        authSource: process.env.MONGO_ADMIN_USERNAME,
        auth: {
          username: process.env.MONGO_ADMIN_USERNAME,
          password: process.env.MONGO_ADMIN_PASSWORD,
        },
      },
    ),
    UserModule,
    TransactionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
