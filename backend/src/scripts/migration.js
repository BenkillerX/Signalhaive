import mongoose from "mongoose";
import dotenv from "dotenv";
import USER from "../models/User.js";

dotenv.config();

const migrateUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    const result = await USER.updateMany(
      {},
      {
        $set: {
          subscriptionPlan: "none",
          subscriptionStatus: "inactive",
          subscriptionStartDate: null,
          subscriptionEndDate: null,
          isBanned: false,
          bannedAt: null,
          banReason: null,
        },
      }
    );

    console.log(`Users matched: ${result.matchedCount}`);
    console.log(`Users modified: ${result.modifiedCount}`);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
};

migrateUsers();