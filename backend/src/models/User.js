import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },

        lastname: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        passwordResetToken: {
            type: String,
            default: null,
        },

        passwordResetExpires: {
            type: Date,
            default: null,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationCode: {
            type: String,
        },

        emailVerificationExpires: {
            type: Date,
        },

        onboardingCompleted: {
            type: Boolean,
            default: false,
        },

        // =========================
        // SUBSCRIPTION
        // =========================

        subscriptionPlan: {
            type: String,
            enum: ["none", "weekly", "monthly", "yearly"],
            default: "none",
        },

        subscriptionStatus: {
            type: String,
            enum: ["inactive", "active", "expired", "cancelled"],
            default: "inactive",
        },

        subscriptionStartDate: {
            type: Date,
            default: null,
        },

        subscriptionEndDate: {
            type: Date,
            default: null,
        },

        // =========================
        // ACCOUNT STATUS
        // =========================

        isBanned: {
            type: Boolean,
            default: false,
        },

        bannedAt: {
            type: Date,
            default: null,
        },

        banReason: {
            type: String,
            default: null,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const USER = mongoose.model("User", userSchema);

export default USER;