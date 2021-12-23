import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditRecordSchema } from 'src/entities/auditRecord.entity';
import { UpdateHistorySchema } from 'src/entities/updateHistory.entity';
import { FormController } from './controllers/form.controller';
import { FormService } from './services/form.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AuditRecord', schema: AuditRecordSchema },
      { name: 'UpdateHistory', schema: UpdateHistorySchema },
    ]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
