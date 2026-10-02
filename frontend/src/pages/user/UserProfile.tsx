import { useAuth } from "../../hooks/useAuth";
import type { Dispatch, SetStateAction } from "react";

type UserProfileProps = {
  getInitials: () => string;
  isEditingProfile: boolean;
  handleEditProfile: () => void;
  profileData: {
    firstname: string;
    lastname: string;
  };
  setProfileData: Dispatch<
    SetStateAction<{
      firstname: string;
      lastname: string;
    }>
  >;
  handleSaveProfile: () => Promise<void>;
  profileLoading: boolean;
};

const UserProfile = ({
  getInitials,
  isEditingProfile,
  handleEditProfile,
  profileData,
  setProfileData,
  handleSaveProfile,
  profileLoading,
}: UserProfileProps) => {
    const {currentUser} = useAuth()

  return (
       <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Profile
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your personal information and account identity.
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl font-semibold text-emerald-700">
                  {getInitials()}
                </div>

                {/* User info */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {currentUser?.firstname}{" "}
                    {currentUser?.lastname}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {currentUser?.email}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      Active
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
                      {currentUser?.role ?? "Member"}
                    </span>
                  </div>
                </div>

                {/* Edit / Cancel */}
                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {isEditingProfile
                    ? "Cancel"
                    : "Edit Profile"}
                </button>
              </div>

              {/* Profile fields */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                {/* First Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    First Name
                  </label>

                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.firstname}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          firstname: e.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  ) : (
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {currentUser?.firstname || "—"}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>

                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.lastname}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          lastname: e.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  ) : (
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {currentUser?.lastname || "—"}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {currentUser?.email || "—"}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Account Role
                  </label>

                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm capitalize text-slate-700">
                    {currentUser?.role || "Member"}
                  </div>
                </div>
              </div>

              {/* Save button */}
             {isEditingProfile && (
        <div className="mt-6 flex justify-end">
            <button
            type="button"
            onClick={handleSaveProfile}
            disabled={profileLoading}
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
            {profileLoading ? "Saving..." : "Save Changes"}
            </button>
        </div>
        )}
            </div>
          </section>
  )
}

export default UserProfile