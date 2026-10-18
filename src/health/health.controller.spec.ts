import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;

  const healthCheckService = {
    check: vi.fn((indicators: Array<() => unknown>) =>
      Promise.all(indicators.map((indicator) => indicator())),
    ),
  };

  const pingCheckResult = { withTimeout: vi.fn() };
  const typeOrmHealthIndicator = {
    pingCheck: vi.fn(() => pingCheckResult),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: healthCheckService },
        { provide: TypeOrmHealthIndicator, useValue: typeOrmHealthIndicator },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should ping the database with a 1s timeout', async () => {
    await controller.check();

    expect(healthCheckService.check).toHaveBeenCalledTimes(1);
    expect(typeOrmHealthIndicator.pingCheck).toHaveBeenCalledWith('database');
    expect(pingCheckResult.withTimeout).toHaveBeenCalledWith(1000);
  });
});
