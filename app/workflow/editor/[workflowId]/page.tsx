import { waitFor } from "@/lib/helper/waitFor";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";

// We can retrieve the workflow id from the url by using params property
async function page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = params;
  const { userId } = await auth();

  // If there is no user throw an error. We use the users' id as an additional security measure
  // Because without checking it, someone can potentially modify the url and try different workflow id
  // Giving unauthorize access to someone else's workflow
  if (!userId) return <div>unauthenticated</div>;

  //By including the userId in the query we are making to Prisma, we ensure only the authenticated users can view their workflow
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  // If the workflow is not defined
  if (!workflow) return <div>Workflow not found</div>;
  return (
    // <div>page</div>
    // <pre>{JSON.stringify(workflow, null, 4)}</pre>
    <Editor workflow={workflow} />
  );
}

export default page;
