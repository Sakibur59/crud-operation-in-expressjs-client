"use server";
import { revalidatePath } from "next/cache";

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
