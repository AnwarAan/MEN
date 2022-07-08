import 'dotenv/config';

export default {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.BD_PORT
}