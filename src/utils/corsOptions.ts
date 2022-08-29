import { config } from "./config";

export const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
};
