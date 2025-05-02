import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { EvolutionConfigDto } from './dto/evolution-config.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EvolutionService implements OnModuleInit {
  private config: EvolutionConfigDto;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.config = {
      baseUrl: this.configService.get<string>('EVOLUTION_API_URL', 'http://localhost:8080'),
      apiKey: this.configService.get<string>('EVOLUTION_API_KEY', 'your-secret-key-here'),
      sessionPath: this.configService.get<string>('EVOLUTION_SESSION_PATH', './sessions'),
    };
  }

  async onModuleInit() {
    await this.healthCheck();
  }

  private getHeaders() {
    return {
      'apikey': this.config.apiKey,
      'Content-Type': 'application/json',
    };
  }

  async healthCheck() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.config.baseUrl}`, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Evolution API health check failed: ${error.message}`);
    }
  }

  async createInstance(instanceId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.config.baseUrl}/instance/create`,
          {
            instanceName: instanceId,
            token: instanceId,
            qrcode: true,
            number: '',
            webhook: `${this.config.baseUrl}/webhook/${instanceId}`,
          },
          { headers: this.getHeaders() },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create instance: ${error.message}`);
    }
  }

  async connectInstance(instanceId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.config.baseUrl}/instance/connect/${instanceId}`,
          {},
          { headers: this.getHeaders() },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to connect instance: ${error.message}`);
    }
  }

  async sendMessage(instanceId: string, to: string, message: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.config.baseUrl}/message/sendText/${instanceId}`,
          {
            number: to,
            text: message,
          },
          { headers: this.getHeaders() },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async logoutInstance(instanceId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(
          `${this.config.baseUrl}/instance/logout/${instanceId}`,
          { headers: this.getHeaders() },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to logout instance: ${error.message}`);
    }
  }

  async getInstanceInfo(instanceId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.config.baseUrl}/instance/info/${instanceId}`,
          { headers: this.getHeaders() },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get instance info: ${error.message}`);
    }
  }
}