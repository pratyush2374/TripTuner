import { Redis } from "ioredis";

class RedisClient {
    private static instance: Redis | null = null;

    public static getInstance(): Redis {
        if (!RedisClient.instance) {
            RedisClient.instance = new Redis({
                username: process.env.REDIS_USERNAME,
                password: process.env.REDIS_PASSWORD,
                host: process.env.REDIS_HOST,
                port: 14258,
                retryStrategy(times) {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
                enableReadyCheck: true,
                connectTimeout: 10000,
                lazyConnect: true,
            });

            // Connection event handlers
            RedisClient.instance.on("connect", () => {
                console.log("Redis client connected");
            });

            RedisClient.instance.on("error", (err) => {
                console.error("Redis Client Error:", err);
            });

            RedisClient.instance.on("ready", () => {
                console.log("Redis client ready");
            });

            RedisClient.instance.on("end", () => {
                console.log("Redis client connection ended");
            });

            // Shutdown
            process.on("SIGINT", () => {
                RedisClient.instance?.quit().then(() => {
                    console.log(
                        "Redis client disconnected through app termination"
                    );
                    process.exit(0);
                });
            });
        }

        return RedisClient.instance;
    }
}

const client = RedisClient.getInstance();

export default client;
