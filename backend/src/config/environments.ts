import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envScchema = joi.object({
    PORT: joi.number().default(5000),
    NODE_ENV: joi.string().valid("development", "production", "test").default("development"),
    MONGO_URI: joi.string().required().description("MongoDB connection string"),
    JWT_ACCESS_SECRET: joi.string().required().description("JWT Access Secret Key"),
    JWT_REFRESH_SECRET: joi.string().required().description("JWT Refresh Secret Key"),
}).unknown(true);

const { error, value: envVars } = envScchema.validate(process.env);

if (error) {
    throw new Error(`Environment variables config validation error: ${error.message}`)
}

export const config = {
    port: envVars.PORT as number,
    env: envVars.NODE_ENV as string,
    mongoUri: envVars.MONGO_URI as string,
    jwtAccessSecret: envVars.JWT_ACCESS_SECRET as string,
    jwtRefreshSecret: envVars.JWT_REFRESH_SECRET as string,
};