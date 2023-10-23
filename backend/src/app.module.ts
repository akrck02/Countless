import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './model/schema/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/countless', {
      authSource: 'admin',
      auth: {
        username: 'admin',
        password: 'p4ssw0rd',
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
