import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../di/types';
import { Logger } from '../types/logger';
import { HealthCheckService } from '../services/health/health-check.service';

@injectable()
export class HealthController {
  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.HealthCheck) private healthCheck: HealthCheckService
  ) {}

  async check(req: Request, res: Response) {
    try {
      const health = await this.healthCheck.checkHealth();
      const isHealthy = Object.values(health)
        .filter(check => typeof check === 'object')
        .every(check => check.status === 'healthy');

      return res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? 'pass' : 'fail',
        checks: {
          redis: health.redis,
          api: health.api
        },
        timestamp: health.timestamp
      });
    } catch (error) {
      this.logger.error('Health check failed:', error);
      return res.status(500).json({
        status: 'fail',
        error: 'Health check failed',
        timestamp: new Date()
      });
    }
  }
} 