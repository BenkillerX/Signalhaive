import Signal from "../../models/Signal.js";
import USER from "../../models/User.js";
import { sendPushNotification } from "../../services/pushNotificationService.js";

export const createSignal = async (req, res) => {
  try {
    const {
      pair,
      direction,
      entryPrice,
      stopLoss,
      takeProfit,
      timeframe,
      analysis,
    } = req.body;

    if (
      !pair ||
      !direction ||
      !entryPrice ||
      !stopLoss ||
      !takeProfit ||
      !timeframe
    ) {
      return res.status(400).json({
        message: "Please provide all required signal fields",
      });
    }

   const signal = await Signal.create({
  pair,
  direction,
  entryPrice,
  stopLoss,
  takeProfit,
  timeframe,
  analysis,
  createdBy: req.user.id,
});

try {
  await sendPushNotification({
    title: "New Signal 🚨",
    body: `${pair} ${direction} signal has been posted.`,
    url: "/live-signals",
  });
} catch (error) {
  console.error("Push notification error:", error);
}

    res.status(201).json({
      message: "Signal uploaded successfully",
      signal,
    });
  } catch (error) {
    console.error("Create signal error:", error);

    res.status(500).json({
      message: "Failed to upload signal",
    });
  }
};
export const deleteSignal = async (req, res) => {
  try {
    const { id } = req.params;

    const signal = await Signal.findById(id);

    if (!signal) {
      return res.status(404).json({
        message: "Signal not found",
      });
    }

    await Signal.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Signal deleted successfully",
    });
  } catch (error) {
    console.error("Delete signal error:", error);

    return res.status(500).json({
      message: "Failed to delete signal",
    });
  }
};
export const getSignals = async (req, res) => {
  try {
    const signals = await Signal.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      signals,
    });
  } catch (error) {
    console.error("Get signals error:", error);

    res.status(500).json({
      message: "Failed to fetch signals",
    });
  }
};