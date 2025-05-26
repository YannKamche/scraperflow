// Code that creates the workflow
"use server";

import { prisma } from "@/lib/prisma";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  // We need to first validate this api call with zod. Basically a server action is an httpn point export by nextjs. So we need to validate it
  // So, we are going to do that with zod. So we will reuse the same schema (createWorkflowSchema) both for frontend and backend validation

  const { success, data } = createWorkflowSchema.safeParse(form);

  // If it is not successful, return an error
  if (!success) throw new Error("invalid form data");

  // Check if the user is authenticated
  const { userId } = await auth();

  if (!userId) throw new Error("unauthenticated");

  const result = await prisma.workflow.create({
    data: {
      userId,

      // status: "DRAFT", You can type DRAFT which is a valid string. It's common but encoding strings can lead to issues like typos or inconsistent
      // values across the code base. Instead, it is better to use string enums. That's why we described the WorkflowStatus Enum
      // Thanks to Enums the code is more readable and maintainable by grouping related values together and reducing the risk of errors and you can
      //update it from one place
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  // Check if the result is defined or not

  if (!result) throw new Error("failed to create workflow");

  // If everything goes well, redirect the user to the editor page
  redirect("/workflow/editor/${result.id}");
}
