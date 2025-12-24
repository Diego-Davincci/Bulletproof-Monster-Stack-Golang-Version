// Main server setup
import Express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config";
import passport from "passport";
import rateLimit from "express-rate-limit";

import "./config/passport.config";
import { authRoutes } from "@/modules/auth/auth.routes";
import { HTTP_STATUS, __prod__ } from "./utils/constants";
import { buildJsonRsp } from "./utils/json";
import { getEnv } from "./utils/env";

const env = getEnv();

const main = async () => {
  const server = Express();

  // Server config
  server.use(
    cors({
      origin: process.env.WEBSITE,
      credentials: true,
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
      allowedHeaders: [
        "Content-Type, Content-Length, Accept-Encoding, Authorization, accept, origin, Cache-Control, X-Requested-With",
      ],
    })
  );
  server.use(Express.json());
  server.use(cookieParser());
  server.use(morgan("dev"));
  server.use(passport.initialize()); // Create passport instance to execute auth strategies
  const ApiLimiter = rateLimit({
    // Rate limit the API to potentially avoid DDOS
    windowMs: 10 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 60,
  });
  server.use(ApiLimiter);
  if (__prod__) {
    server.set("trust proxy", 1);
  }

  // Health endpoint
  server.get("/health", (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json(
      buildJsonRsp({
        data: "",
        message: "Everything cool 👍",
        statusCode: HTTP_STATUS.OK,
      })
    );
  });

  // Routing
  server.use("/auth", authRoutes());

  // Start server
  server.listen(env.PORT, () => {
    console.info(`Server up and running on port ${env.PORT}`);
  });
};

main();
