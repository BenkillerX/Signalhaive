import "dotenv/config";
import express from "express";
import { connectDB } from "./src/config/db.js";
import {createServer}  from 'http'
import { Server } from "socket.io";
import cors from "cors";

import authRoutes from "./src/modules/auth/auth.routes.js";
import marketRoutes from "./src/modules/market/market.routes.js";
import {
  connectToMarketData,
  getLatestMarkets,
} from "./src/services/marketService.js";
import signalRoutes from "./src/modules/signal/signal.routes.js";
import adminRoutes from "./src/modules/admin/admin.routes.js";
import notificationsRouter from "./src/modules/notifications/notification.routes.js";
import { apiLimiter, authLimiter } from "./src/middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(apiLimiter);
app.use("/api/auth",authLimiter ,authRoutes);
app.use("/api/markets", marketRoutes);
app.use("/api/signal", signalRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/notifications', notificationsRouter)

app.get("/", (req, res) => {
  res.json({
    message: "SignalHaive API is running",
  });
});
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://signalhive-sooty.vercel.app",
    ],
  },
});
io.on('connection', (socket)=>{
      console.log('user connected successfully');
})
connectToMarketData(io);
const startServer = async () => {
  try {
    await connectDB();

    console.log("Mongodb connected successfully");

    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error(
      "An error occurred while starting the server:",
      error
    );

    process.exit(1);
  }
};

startServer();