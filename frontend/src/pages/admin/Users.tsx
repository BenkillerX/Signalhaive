import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Ban, Trash2, RotateCcw } from "lucide-react";
import AdminUserActionModal from "../../components/AdminUserActionModal";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  isBanned: boolean;
  bannedAt: string | null;
  banReason: string | null;
}

type ActionType = "ban" | "unban" | "delete";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [banReason, setBanReason] = useState("");

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

  const openActionModal = (user: User, action: ActionType) => {
    setSelectedUser(user);
    setActionType(action);
    setBanReason("");
  };

 const resetActionModal = () => {
  setSelectedUser(null);
  setActionType(null);
  setBanReason("");
};

const closeActionModal = () => {
  if (actionLoading) return;

  resetActionModal();
};

  const handleConfirmAction = async () => {
    if (!selectedUser || !actionType) return;

    setActionLoading(true);

    try {
      // BAN
      if (actionType === "ban") {
        const reason = banReason.trim();

        await api.patch(
          `/api/admin/users/${selectedUser._id}/ban`,
          {
            reason,
          }
        );

        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user._id === selectedUser._id
              ? {
                  ...user,
                  isBanned: true,
                  bannedAt: new Date().toISOString(),
                  banReason: reason || null,
                }
              : user
          )
        );

        toast.success("User banned successfully.");
      }

      // UNBAN
      if (actionType === "unban") {
        await api.patch(
          `/api/admin/users/${selectedUser._id}/unban`
        );

        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user._id === selectedUser._id
              ? {
                  ...user,
                  isBanned: false,
                  bannedAt: null,
                  banReason: null,
                }
              : user
          )
        );

        toast.success("User unbanned successfully.");
      }

      // DELETE
      if (actionType === "delete") {
        await api.delete(
          `/api/admin/users/${selectedUser._id}`
        );

        setUsers((currentUsers) =>
          currentUsers.filter(
            (user) => user._id !== selectedUser._id
          )
        );

        toast.success("User deleted successfully.");
      }

      closeActionModal();
    } catch (error) {
      console.error(`Failed to ${actionType} user:`, error);

      if (actionType === "ban") {
        toast.error("Failed to ban user.");
      } else if (actionType === "unban") {
        toast.error("Failed to unban user.");
      } else {
        toast.error("Failed to delete user.");
      }
    } finally {
      setActionLoading(false);
    }
  };

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
    <>
      <section className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Users
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage SignalHaive users and account access.
            </p>
          </div>

          {/* Users */}
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
                    className="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    {/* User information */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-medium text-white">
                          {user.firstname} {user.lastname}
                        </h2>

                        {/* Role */}
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            user.role === "admin"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          {user.role}
                        </span>

                        {/* Ban status */}
                        {user.isBanned && (
                          <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-400">
                            Banned
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {user.email}
                      </p>

                      {user.isBanned && user.banReason && (
                        <p className="mt-2 text-xs text-red-400/80">
                          Reason: {user.banReason}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    {user.role !== "admin" && (
                      <div className="flex shrink-0 items-center gap-2">
                        {user.isBanned ? (
                          <button
                            type="button"
                            onClick={() =>
                              openActionModal(user, "unban")
                            }
                            className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                          >
                            <RotateCcw size={16} />
                            Unban
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              openActionModal(user, "ban")
                            }
                            className="flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-3 py-2 text-sm font-medium text-orange-400 transition hover:bg-orange-500/20"
                          >
                            <Ban size={16} />
                            Ban
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            openActionModal(user, "delete")
                          }
                          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation modal */}
      {selectedUser && actionType && (
        <AdminUserActionModal
          isOpen={true}
          action={actionType}
          userName={`${selectedUser.firstname} ${selectedUser.lastname}`}
          banReason={banReason}
          onBanReasonChange={setBanReason}
          onConfirm={handleConfirmAction}
          onCancel={closeActionModal}
          loading={actionLoading}
        />
      )}
    </>
  );
};

export default Users;