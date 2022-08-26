import "dotenv/config";

export const config = {
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT || 7777,
    secret: process.env.SECRET,
    ADMIN_MAIL: process.env.ADMIN_MAIL,
    ADMIN_MAIL_PASS: process.env.ADMIN_MAIL_PASS,
    AUTH_MODE: process.env.AUTH_MODE,
};
