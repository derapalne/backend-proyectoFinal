import "dotenv/config";

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 7777,
    SECRET: process.env.SECRET,
    ADMIN_MAIL: process.env.ADMIN_MAIL,
    ADMIN_MAIL_PASS: process.env.ADMIN_MAIL_PASS,
    AUTH_MODE: process.env.AUTH_MODE,
    IS_ADMIN: process.env.IS_ADMIN,
};
