import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { EvolutionService } from './evolution.service';

@Controller('evolution')
export class EvolutionController {
  constructor(private readonly evolutionService: EvolutionService) {}

  @Post('instance/:id')
  async createInstance(@Param('id') id: string) {
    return this.evolutionService.createInstance(id);
  }

  @Post('instance/:id/connect')
  async connectInstance(@Param('id') id: string) {
    return this.evolutionService.connectInstance(id);
  }

  @Post('instance/:id/message')
  async sendMessage(
    @Param('id') id: string,
    @Body() body: { to: string; message: string },
  ) {
    return this.evolutionService.sendMessage(id, body.to, body.message);
  }

  @Delete('instance/:id')
  async logoutInstance(@Param('id') id: string) {
    return this.evolutionService.logoutInstance(id);
  }

  @Get('instance/:id')
  async getInstanceInfo(@Param('id') id: string) {
    return this.evolutionService.getInstanceInfo(id);
  }
}