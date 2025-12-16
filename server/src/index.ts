// Main server setup
import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config";

const main = async () => {
  try {
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
    server.use(morgan("combined"));

    // Routing TODO: health endpoint

    // Start server
    const PORT = Number(process.env.PORT) || 5000;
    server.listen(PORT, () => {
      console.info(`Server up and running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit with an error code if there's a problem
  }
};

main();
