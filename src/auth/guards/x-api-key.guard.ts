import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class XApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('X-API-KEY header is missing');
    }

    const validKey = this.configService.get<string>('API_KEY');
    if (apiKey !== validKey) {
      throw new UnauthorizedException('Invalid X-API-KEY');
    }

    // Optionally attach some info to request
    request['apiKey'] = apiKey;

    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    const apiKeyHeader = request.headers['x-api-key'];
    if (typeof apiKeyHeader === 'string') return apiKeyHeader;
    return undefined;
  }
}
