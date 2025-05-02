import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvolutionModule } from './evolution/evolution.module';

@Module({
  imports: [EvolutionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
