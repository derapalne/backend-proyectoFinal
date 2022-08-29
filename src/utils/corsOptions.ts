import { config } from "./config";

export const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    maxAge: 86400,
};
