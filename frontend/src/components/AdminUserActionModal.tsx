import { AlertTriangle, Ban, Trash2, X } from "lucide-react";

type ActionType = "ban" | "delete";

interface AdminUserActionModalProps {
  isOpen: boolean;
  action: ActionType;
  userName: string;
  banReason?: string;
  onBanReasonChange?: (reason: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const AdminUserActionModal = ({
  isOpen,
  action,
  userName,
  banReason = "",
  onBanReasonChange,
  onConfirm,
  onCancel,
  loading = false,
}: AdminUserActionModalProps) => {
  if (!isOpen) return null;

  const isBan = action === "ban";

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 px-4">
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${
            isBan ? "bg-orange-500/10" : "bg-red-500/10"
          }`}
        >
          {isBan ? (
            <Ban className="text-orange-400" size={24} />
          ) : (
            <Trash2 className="text-red-400" size={24} />
          )}
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-white">
          {isBan ? "Ban user?" : "Delete user?"}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {isBan ? (
            <>
              Are you sure you want to ban{" "}
              <span className="font-medium text-white">{userName}</span>?
              They will no longer be able to use SignalHive.
            </>
          ) : (
            <>
              Are you sure you want to permanently delete{" "}
              <span className="font-medium text-white">{userName}</span>?
              This action cannot be undone.
            </>
          )}
        </p>

        {/* Ban reason */}
        {isBan && (
          <div className="mt-5">
            <label
              htmlFor="ban-reason"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Reason for ban
            </label>

            <textarea
              id="ban-reason"
              value={banReason}
              onChange={(event) =>
                onBanReasonChange?.(event.target.value)
              }
              placeholder="Enter a reason..."
              rows={3}
              disabled={loading}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-orange-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        )}

        {/* Warning */}
        <div className="mt-5 flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-yellow-400"
          />

          <p className="text-xs leading-5 text-slate-400">
            {isBan
              ? "The user will remain in the database but their account will be marked as banned."
              : "Deleting this user permanently removes their account from the database."}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading || (isBan && !banReason.trim())}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isBan
                ? "bg-orange-500 hover:bg-orange-400"
                : "bg-red-500 hover:bg-red-400"
            }`}
          >
            {loading
              ? "Processing..."
              : isBan
              ? "Ban User"
              : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserActionModal;