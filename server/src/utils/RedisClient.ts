import { Redis } from "ioredis";

class RedisClient {
    private static instance: Redis | null = null;

    public static getInstance(): Redis {
        if (!RedisClient.instance) {
            RedisClient.instance = new Redis({
                username: "default",
                password: "KpA5TeTLWpkp4LYYzEsdbxI3mVzfUQR1",
                host: "redis-14258.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
                port: 14258,
                retryStrategy(times) {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
                enableReadyCheck: true,
                connectTimeout: 10000,
                lazyConnect: true, // Only connect when first command is executed
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

            // Graceful shutdown
            process.on("SIGINT", () => {
                RedisClient.instance?.quit().then(() => {
                    console.log("Redis client disconnected through app termination");
                    process.exit(0);
                });
            });
        }

        return RedisClient.instance;
    }
}

const client = RedisClient.getInstance();

export default client;