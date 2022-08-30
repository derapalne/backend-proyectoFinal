import { config } from "./config";

export const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type","Access-Control-Allow-Headers","Access-Control-Request-Method","Access-Control-Request-Headers","Access-Control-Allow-Credentials"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    maxAge: 86400,
};
