import { createClient } from 'redis';

let redis;

if (!global.redisClient) {
  redis = createClient({
    socket: {
    // host: '127.0.0.1', // force IPv4 instead of ::1
    // port: 6379,
    reconnectStrategy: (retries) => {
      if (retries > 5) return new Error('Retry limit reached');
      return 1000; // retry after 1 sec
    },
  },
  });

  redis.on('error', (err) => console.error('Redis Client Error:', err));

  redis.connect().catch((err) => console.error('Redis Connect Error:', err));

  global.redisClient = redis;
} else {
  redis = global.redisClient;
}

export default redis;
