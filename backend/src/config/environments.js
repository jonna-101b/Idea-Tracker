import dotenv from "dotenv";
import joi from "joi";
dotenv.config();
const envScchema = joi.object({
    PORT: joi.number().default(5000),
    NODE_ENV: joi.string().valid("development", "production", "test").default("development"),
    MONGO_URI: joi.string().required().description("MongoDB connection string"),
    JWT_SECRET: joi.string().required().description("JWT Secret Key"),
}).unknown(true);
const { error, value: envVars } = envScchema.validate(process.env);
if (error) {
    throw new Error(`Environment variables config validation error: ${error.message}`);
}
export const config = {
    port: envVars.PORT,
    env: envVars.NODE_ENV,
    mongoUri: envVars.MONGO_URI,
    jwtSecret: envVars.JWT_SECRET,
};
//# sourceMappingURL=environments.js.map