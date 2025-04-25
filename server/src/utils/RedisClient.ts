import Redis from "ioredis";

class RedisClient {
  private static instance: Redis;

  // prevent direct instantiation
  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      // parse env (with sensible defaults)
      const host = process.env.REDIS_HOST
      const port = parseInt(process.env.REDIS_PORT ?? "11070", 10);
      const username = process.env.REDIS_USERNAME;
      const password = process.env.REDIS_PASSWORD;

      RedisClient.instance = new Redis({
        host,
        port,
        username,
        password,
        retryStrategy(attempts) {
          return Math.min(attempts * 50, 2000);
        },
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000,
        // remove lazyConnect so that it connects immediately
      });

      // wire up events
      RedisClient.instance.on("connect", () => {
        console.log("Redis client connected");
      });

      RedisClient.instance.on("ready", () => {
        console.log("Redis client ready to use");
      });

      RedisClient.instance.on("error", (err) => {
        console.error("Redis Client Error:", err);
      });

      RedisClient.instance.on("end", () => {
        console.log("Redis client connection ended");
      });

      // clean shutdown
      process.on("SIGINT", async () => {
        try {
          await RedisClient.instance.quit();
          console.log("Redis client disconnected through app termination");
          process.exit(0);
        } catch (err) {
          console.error("Error quitting Redis on shutdown:", err);
          process.exit(1);
        }
      });
    }

    return RedisClient.instance;
  }
}

export default RedisClient.getInstance();
