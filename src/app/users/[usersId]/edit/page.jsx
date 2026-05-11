import { updateUser } from "@/app/lib/actions";
import { getUserById } from "@/app/lib/data";
import { Button, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import React from "react";

const UserEditPage = async ({ params }) => {
  const { usersId } = await params;
  const user = await getUserById(usersId);

  const updateUserWrapper = async (formData) => {
    "use server";
    return updateUser(usersId, formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 border border-slate-200">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-800">
            Edit User
          </h2>
          <p className="text-slate-500 mt-2">
            Update user information easily
          </p>
        </div>

        {/* Form */}
        <form action={updateUserWrapper} className="flex flex-col gap-6">
          
          <TextField
            className="w-full"
            name="name"
            type="text"
            defaultValue={user?.name}
          >
            <Label className="mb-1 font-semibold">Name</Label>
            <Input
              placeholder="Enter your name"
              className="rounded-xl"
            />
          </TextField>

          <TextField
            className="w-full"
            name="email"
            type="email"
            defaultValue={user?.email}
          >
            <Label className="mb-1 font-semibold">Email</Label>
            <Input
              placeholder="Enter your email"
              className="rounded-xl"
            />
          </TextField>

          <TextField
            className="w-full"
            name="role"
            type="text"
            defaultValue={user?.role}
          >
            <Label className="mb-1 font-semibold">Role</Label>
            <Input
              placeholder="Enter your role"
              className="rounded-xl"
            />
          </TextField>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Link href={"/users"} className="w-full">
              <Button
                variant="bordered"
                className="w-full rounded-xl border-slate-400"
              >
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              className="w-full rounded-xl bg-black text-white font-semibold"
            >
              Update User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;