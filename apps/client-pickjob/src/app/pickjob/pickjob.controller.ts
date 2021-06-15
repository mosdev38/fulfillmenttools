import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { Pickjob } from 'libs/models/src/lib/pickjob/pickjob.model';
import { PickjobService } from './pickjob.service';
import fetch from 'node-fetch';

@Controller('pickjobs')
export class PickJobController {
  constructor(private pickjobService: PickjobService) {}

  @Get()
  findOne(@Query('orderRef') orderRef: string): Promise<Pickjob[]> {
    return this.pickjobService.getPickjobs(orderRef);
  }

  @Patch(':pickjobId')
  patchAPickJob(@Param('pickjobId') pickjobId: string): Promise<Pickjob[]> {
    console.log(pickjobId);
    return this.pickjobService.setInProgress(pickjobId);
  }

  @Patch(':pickjobId/pickjobLine/:picklineId')
  patchPickjobItems(
    @Param('pickjobId') pickjobId: string,
    @Param('picklineId') picklineId: string
  ): Promise<Pickjob[]> {
    console.log(pickjobId + ' / ' + picklineId);
    return this.pickjobService.pickItems(pickjobId, picklineId);
  }
}
