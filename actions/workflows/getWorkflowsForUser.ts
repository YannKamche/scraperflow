// Code that gets the workflows of a user
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function GetWorkflowsForUser() {
  // We need to know the user ID and by doing that we are also check if the user is authenticated
  const { userId } = await auth();

  // If user id is not defined, throw an error
  if (!userId) {
    throw new Error("unauthenticated");
  }

  //  If everything is ok
  return prisma.workflow.findMany({
    // Getting all the workflows for a particular userId
    where: {
      userId,
    },
    // Put them in ascending order
    orderBy: {
      createdAt: "asc",
    },
  });

  // Immediately reload the workflow page (a server component)
  revalidatePath("/worflows");
}
