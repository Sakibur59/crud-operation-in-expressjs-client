"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const AddUser = async (formData) => {
  const newUser = Object.fromEntries(formData.entries());
  const res = await fetch(`http://localhost:5000/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const data = await res.json();
  //revalidate cache
  if (data.insertedId) {
    revalidatePath("/users");
  }
  return data;
};

export const updateUser = async (usersId, formData) => {
  const updatedUser = Object.fromEntries(formData.entries());
  const res = await fetch(`http://localhost:5000/users/${usersId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  const data = await res.json();
  //revalidate cache
  if (data.modifiedCount > 0) {
    revalidatePath("/users");
    redirect("/users");
  }
  return data;
};
export const deleteUser = async (userId) => {
  const res = await fetch(`http://localhost:5000/users/${userId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  //revalidate cache
  if (data.deletedCount > 0) {
    revalidatePath("/users");
  }
  return data;
};
