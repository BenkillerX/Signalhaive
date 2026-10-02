import { useEffect, useState, type ReactNode } from "react";
import api from "../services/api";
import axios from "axios";
import {
  AuthContext,
  type RegisterData,
  type User,
} from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCurrentUser(null);
      return;
    }

    try {
      const response = await api.get("/api/auth/me");

      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Failed to restore user:", error);

      localStorage.removeItem("token");
      setCurrentUser(null);
    }
  };

  getCurrentUser();
}, []);

  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/auth/register", data);
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    setError(
      error.response?.data?.message ||
        "Unable to create your account."
    );
  } else {
    setError("Something went wrong.");
  }

  throw error;
} finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string) => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.post("/api/auth/verify-email", {
      email,
      code,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    setCurrentUser(user);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setError(
        error.response?.data?.message ||
          "Invalid or expired verification code."
      );
    } else {
      setError("Something went wrong.");
    }

    throw error;
  } finally {
    setLoading(false);
  }
};
const login = async (email: string, password: string) => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    setCurrentUser(user);

    return user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } else {
      setError("Something went wrong.");
    }

    throw error;
  } finally {
    setLoading(false);
  }
};
const refreshCurrentUser = async () => {
  try {
    const response = await api.get("/api/auth/me");
    setCurrentUser(response.data.user);
  } catch (error) {
    console.error("Failed to refresh current user:", error);
  }
};

const logout = () => {
  localStorage.removeItem("token");
  setCurrentUser(null);
};
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        verifyEmail,
        loading,
        error,
        login,
        refreshCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};