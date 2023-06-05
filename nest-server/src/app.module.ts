import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfigurationModule } from './infrastructure/configuration/app-configuration.module';
import { AppConfigurationService } from './infrastructure/configuration/app-configuration.service';


@Module({
  imports: [AppConfigurationModule, MessagesModule, MongooseModule.forRootAsync({
    imports: [AppConfigurationModule],
    inject: [AppConfigurationService],
    useFactory: (appConfigService: AppConfigurationService) => {
      const options: MongooseModuleOptions = {
        uri: appConfigService.connectionString,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      return options;
    },
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rnylhwj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
//`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tn59aft.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

// DB_USER=konstantindnd
// DB_PASSWORD=zotja2-nIpvow-fuqgud
// DB_NAME=crunchaiy

// imports: [MessagesModule, MongooseModule.forRoot(
//   'mongodb+srv://konstantindnd:zotja2-nIpvow-fuqgud@cluster0.rnylhwj.mongodb.net/crunchaiy?retryWrites=true&w=majority'
//   )],