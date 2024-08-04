import Redlock from 'redlock';
import { ENVIRONMENT } from '@/environments/environment';
import { createClient } from 'redis';

// sudo service redis-server start

export const REDIS = createClient(ENVIRONMENT.redis);

REDIS.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export const REDLOCK = new Redlock([REDIS], {
  driftFactor: 0.01,
  retryCount: 5,
  retryDelay: 200,
  retryJitter: 200,
});
