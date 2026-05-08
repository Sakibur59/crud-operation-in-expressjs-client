import { getUserById } from "@/app/lib/data";
import React from "react";

const UserDetailsPage = async ({ params }) => {
  const { usersId } = await params;
  const user = await getUserById(usersId);
  return (
    <div className=" mt-20">
      <div className="border-2 w-100 mx-auto p-10">
        <h2 className="font-bold text-blue-500">User details:{user.name}</h2>
        <p className="font-bold text-blue-500">Email: {user.email}</p>
        <p className="font-bold text-blue-500">Role: {user.role}</p>
      </div>
    </div>
  );
};

export default UserDetailsPage;
