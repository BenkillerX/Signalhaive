import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/admin/users");

        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-zinc-950 px-4 py-6">
        <p className="text-sm text-slate-400">
          Loading users...
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Users
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage SignalHive users.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
          {users.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-500">
                No users found.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="font-medium text-white">
                      {user.firstname} {user.lastname}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Users;