import { all } from "axios";
import redis from "./redis";

// export const apiRateLimitter = async (key) => {    // fixed window
//     key = `user_ip:${key}`;
//     let count = await redis.get(key);
//     count = count ? Number(count) : 0;
//     console.log('Rate limit count for key:', key, 'is:', count);
//     if(count === 0){
//         await redis.set(key, 1, { EX: 20 }); // Set expiration in seconds
//         return true;
//     }
//     await redis.incr(key);
//     return count < Number(process.env.RATE_LIMIT);     
// }

export const apiRateLimitter = async (key) => {     // sliding window
    key = `user_ip:${key}`;
    const currentTimestamp = Date.now();
    const count = await redis.lLen(key);
    console.log('Rate limit count for key:', key, 'is:', count);
    if (count < process.env.RATE_LIMIT) {
        await redis.lPush(key, currentTimestamp);
        await redis.expire(key, 20);
        return true;
    }
    const lastTimestamp = await redis.rPop(key);
    if (currentTimestamp - Number(lastTimestamp) < 20000) {
        await redis.rPush(key, lastTimestamp);
        return false;
    }
    await redis.lPush(key, currentTimestamp);
    await redis.expire(key, 20);
    return true;
}

export const loginRateLimitter = async (key) => {
    key = `login_key:${key}`;
    let count = await redis.get(key);
    count = count ? Number(count) : 0;
    console.log('Login rate count for key:', key, 'is:', count);
    if (count === 0) {
        await redis.set(key, 1, { EX: 20 }); // Set expiration in seconds
        return { allowed: true };
    }
    await redis.incr(key);
    if (count == 3) {
        await redis.expire(key, 60); // Set expiration to 60 seconds after 3 attempts
    }
    const expireTime = await redis.ttl(key);
    return { allowed: count < Number(process.env.LOGIN_ATTEMPTS), retry: expireTime };
}

