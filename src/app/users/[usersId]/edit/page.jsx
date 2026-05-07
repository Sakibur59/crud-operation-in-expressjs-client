import { getUserById } from "@/app/lib/data";
import { Button, Input, Label, TextField } from "@heroui/react";
import React from "react";

const UserEditPage = async ({ params }) => {
  const { usersId } = await params;
  const user = await getUserById(usersId);
  return (
    <div>
      <h2>Editing User:</h2>
      <div className="w-1/2 mx-auto">
        <form className="flex flex-col gap-4">
          <TextField className="w-full" name="name" type="text" defaultValue={user?.name}>
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
          </TextField>
          <TextField className="w-full" name="email" type="email" defaultValue={user?.email}>
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
          </TextField>
          <TextField className="w-full" name="role" type="text" defaultValue={user?.role}>
            <Label>Role</Label>
            <Input placeholder="Enter your Role" />
          </TextField>

         <div className="flex gap-2">
             <Button slot="close" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" slot="close">
            Update User
          </Button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
