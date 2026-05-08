"use client";
import React from "react";
import { AlertDialog, Button, Table } from "@heroui/react";
import Link from "next/link";

const roleConfig = {
  admin: {
    label: "Admin",
    bg: "bg-rose-50",
    text: "text-rose-700",
    dot: "bg-rose-500",
  },
  moderator: {
    label: "Moderator",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  editor: {
    label: "Editor",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
  user: {
    label: "User",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
};

const avatarColors = [
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-pink-100 text-pink-700",
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name = "") {
  const idx = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
}

const RoleBadge = ({ role }) => {
  const cfg = roleConfig[role] ?? {
    label: role,
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const UsersTable = ({ users, deleteUserAction }) => {
  const handleDelete = async (userId) => {
    await deleteUserAction(userId);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1.2fr_2.5fr_1.5fr] px-6 py-3 bg-gray-50 border-b border-gray-100">
        {["Name", "Role", "Email", "Actions"].map((h) => (
          <span
            key={h}
            className="text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {users.map((user, i) => {
          const avatarColor = getAvatarColor(user.name);
          return (
            <div
              key={user._id}
              className="grid grid-cols-[2fr_1.2fr_2.5fr_1.5fr] items-center px-6 py-4 hover:bg-gray-50/60 transition-colors duration-150 group"
            >
              {/* Name + Avatar */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColor}`}
                >
                  {getInitials(user.name)}
                </div>
                <span className="text-sm font-medium text-gray-800 truncate">
                  {user.name}
                </span>
              </div>

              {/* Role */}
              <div>
                <RoleBadge role={user.role} />
              </div>

              {/* Email */}
              <div className="min-w-0">
                <span className="text-sm text-gray-500 truncate block">
                  {user.email}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link href={`/users/${user._id}`}>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-150">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Details
                  </button>
                </Link>

                <Link href={`/users/${user._id}/edit`}>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 border border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm transition-all duration-150">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                </Link>

                <AlertDialog>
                  <AlertDialog.Trigger >
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 border border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-sm transition-all duration-150">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </AlertDialog.Trigger>

                  <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                      <AlertDialog.Dialog className="sm:max-w-[400px] rounded-2xl border border-gray-100 shadow-xl">
                        <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" />

                        <AlertDialog.Header className="pt-6 px-6 pb-0 flex flex-col items-center text-center gap-3">
                          {/* Danger icon */}
                          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                              />
                            </svg>
                          </div>
                          <AlertDialog.Heading className="text-base font-semibold text-gray-900">
                            Delete user permanently?
                          </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body className="px-6 py-4 text-center">
                          <p className="text-sm text-gray-500">
                            This will permanently delete{" "}
                            <span className="font-semibold text-gray-800">
                              {user.name}
                            </span>{" "}
                            and all associated data. This action cannot be
                            undone.
                          </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer className="px-6 pb-6 flex gap-2 justify-center">
                          <button
                            slot="close"
                            className="flex-1 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            slot="close"
                            className="flex-1 px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all shadow-sm"
                          >
                            Confirm Delete
                          </button>
                        </AlertDialog.Footer>
                      </AlertDialog.Dialog>
                    </AlertDialog.Container>
                  </AlertDialog.Backdrop>
                </AlertDialog>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {users.length === 0 && (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
            <svg
              className="w-10 h-10 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
