'use server';
import { revalidatePath } from "next/cache";

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
