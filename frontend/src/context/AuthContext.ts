import { createContext } from "react";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";

  subscriptionPlan: "none" | "weekly" | "monthly" | "yearly";
  subscriptionStatus:
    | "inactive"
    | "active"
    | "expired"
    | "cancelled";
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
};
export type RegisterData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type AuthContextType = {
  currentUser: User | null;
  register: (data: RegisterData) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  logout: () => void;
  refreshCurrentUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);