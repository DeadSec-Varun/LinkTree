import { createClient } from 'redis';

let redis;

if (!global.redisClient) {
  redis = createClient();

  redis.on('error', (err) => console.error('Redis Client Error:', err));

  redis.connect().catch((err) => console.error('Redis Connect Error:', err));

  global.redisClient = redis;
} else {
  redis = global.redisClient;
}

export default redis;
