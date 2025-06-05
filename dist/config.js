import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
export default {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    backendUrl: process.env.BACKEND_URL,
    jwtSecret: process.env.JWT_SECRET,
};
//# sourceMappingURL=config.js.map