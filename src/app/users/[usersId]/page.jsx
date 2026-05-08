import { getUserById } from "@/app/lib/data";
import Link from "next/link";
import React from "react";

const roleConfig = {
  admin:     { label: "Admin",     bg: "bg-rose-50",    text: "text-rose-700",    dot: "bg-rose-400",    border: "border-rose-200"    },
  moderator: { label: "Moderator", bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400",   border: "border-amber-200"   },
  editor:    { label: "Editor",    bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  border: "border-violet-200"  },
  user:      { label: "User",      bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400", border: "border-emerald-200" },
};

const avatarColors = [
  { bg: "bg-rose-100",    text: "text-rose-600",    ring: "ring-rose-200"    },
  { bg: "bg-sky-100",     text: "text-sky-600",     ring: "ring-sky-200"     },
  { bg: "bg-violet-100",  text: "text-violet-600",  ring: "ring-violet-200"  },
  { bg: "bg-amber-100",   text: "text-amber-600",   ring: "ring-amber-200"   },
  { bg: "bg-emerald-100", text: "text-emerald-600", ring: "ring-emerald-200" },
];

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function getAvatarColor(name = "") {
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
}

const UserDetailsPage = async ({ params }) => {
  const { usersId } = await params;
  const user = await getUserById(usersId);

  const role = roleConfig[user.role] ?? {
    label: user.role,
    bg: "bg-gray-50",
    text: "text-gray-600",
    dot: "bg-gray-400",
    border: "border-gray-200",
  };

  const avatar = getAvatarColor(user.name);

  return (
    <div className="min-h-screen bg-gray-50/60 flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Top accent strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400" />

          {/* Avatar + name header */}
          <div className="flex flex-col items-center pt-10 pb-6 px-8 border-b border-gray-50">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold ring-4 ${avatar.bg} ${avatar.text} ${avatar.ring} mb-4`}>
              {getInitials(user.name)}
            </div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{user.name}</h1>
            <span className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${role.bg} ${role.text} ${role.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${role.dot}`} />
              {role.label}
            </span>
          </div>

          {/* Info rows */}
          <div className="divide-y divide-gray-50 px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium uppercase tracking-wider">Email</span>
              </div>
              <span className="text-sm text-gray-700 font-medium">{user.email}</span>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-medium uppercase tracking-wider">Role</span>
              </div>
              <span className="text-sm text-gray-700 font-medium capitalize">{user.role}</span>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                </svg>
                <span className="text-xs font-medium uppercase tracking-wider">User ID</span>
              </div>
              <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded-lg">
                {usersId.slice(0, 16)}…
              </span>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex gap-3 px-8 py-6">
            <Link href="/users" className="flex-1">
              <button className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150">
                ← Back
              </button>
            </Link>
            <Link href={`/users/${usersId}/edit`} className="flex-1">
              <button className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-150 shadow-sm shadow-indigo-100">
                Edit user
              </button>
            </Link>
          </div>

        </div>

        {/* Subtle footer note */}
        <p className="text-center text-xs text-gray-300 mt-5">User record · Read only</p>
      </div>
    </div>
  );
};

export default UserDetailsPage;