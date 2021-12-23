import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { FormModule } from './modules/form/form.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    FormModule,
  ],
})
export class AppModule {}
