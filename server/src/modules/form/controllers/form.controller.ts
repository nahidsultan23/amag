import { Body, Controller, Get, Patch } from '@nestjs/common';
import { IUpdateData } from 'src/interfaces/updateData.interface';
import { FormService } from '../services/form.service';

@Controller('api/form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get('')
  async getData() {
    return await this.formService.getData();
  }

  @Patch('update')
  async updateData(@Body() body: IUpdateData) {
    return await this.formService.updateData(body);
  }
}
