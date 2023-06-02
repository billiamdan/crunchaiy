import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MessagesModule, MongooseModule.forRoot(
    'mongodb+srv://konstantindnd:zotja2-nIpvow-fuqgud@cluster0.rnylhwj.mongodb.net/crunchaiy?retryWrites=true&w=majority'
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
