import dotenv from 'dotenv';
dotenv.config();
const config = {
    DbName: process.env.DB_NAME,
    DbUser: process.env.DB_USER,
    DbPassword: process.env.DB_PASSWORD,
    DbHost: process.env.DB_HOST,
    DbPort: process.env.DB_PORT
};

export default config;