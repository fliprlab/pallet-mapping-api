import express, { Request, Response } from "express";
import * as http from "http";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import * as dotenv from "dotenv";
dotenv.config();
import { CommonRoutesConfig } from "./routes/common/common.routes";
import { Config } from "./config/Config";
import { logger, requestLogger } from "./config/logger";
import { AdminRoutes } from "./routes/admin/admin.routes";
import { rateLimit } from "express-rate-limit";
import { JsonResponse } from "./utils/jsonResponse";
import { IndexRoutes } from "./routes/index/index.route";
import { UserRoutes } from "./routes/user/user.routes";
import { AdminHubRoutes } from "./routes/hub/hub.routes";
import { Server } from "socket.io";

const normalizePort = (val: any) => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = normalizePort(process.env.PORT || "4000");
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

export const io = new Server(server, {
  cors: {
    origin: [
      "https://admin.pma.intutrack.com",
      "https://pma.intutrack.com",
      "https://pma-admin-vipt-testing.dev.flipr.co.in",
      "https://admin-dev.pmapping.dev.flipr.co.in", // Dev
      "https://pmapping-web.dev.flipr.co.in", // Dev
      "http://localhost:3000",
      "http://localhost:3001",
      "https://pmapping-admin.dev.flipr.co.in",
    ],
  },
});

// Adding request limiter

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 2 requests per windowMs
  handler: function (req: Request, res: Response /*next*/) {
    return JsonResponse(res, {
      statusCode: 429,
      title: "api limit exceed",
      status: "error",
      message: "You sent too many requests. Please wait a while then try again",
    });
  },
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json({ limit: "3mb" }));

// here we are adding middleware to allow cross-origin requests
app.use(
  cors({
    origin: [
      "https://admin.pma.intutrack.com",
      "https://pma.intutrack.com",
      "https://pma-admin-vipt-testing.dev.flipr.co.in",
      "https://admin-dev.pmapping.dev.flipr.co.in", // Dev
      "https://pmapping-web.dev.flipr.co.in", // Dev
      "http://localhost:3000",
      "http://localhost:3001",
      "https://pmapping-admin.dev.flipr.co.in",
    ],
  })
);

// Set content type GLOBALLY for any response.
app.use(function (req, res, next) {
  res.contentType("application/json");
  next();
});

app.set("rootDirectory", __dirname);

// Set File Uploader

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js

app.use(
  expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true,
  })
);

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
routes.push(new IndexRoutes(app));
routes.push(new AdminRoutes(app));
routes.push(new UserRoutes(app));
routes.push(new AdminHubRoutes(app));

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

// Configuare Server & Start
new Config()
  .start()
  .then(() => {
    server.listen(port, () => {
      console.log(runningMessage);

      routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
      });
      // our only exception to avoiding console.log(), because we
      // always want to know when the server is done starting up
      // console.log(runningMessage);
    });
  })
  .catch((error) => {
    console.log("Config Error ", error);
  });
