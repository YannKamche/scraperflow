"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DeleteWorkflow(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unaunthenticated");
  }

  // We are sure that the workflow belongs to the user before deleting it
  await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });
}
