import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import WorkflowCard from "./_components/WorkflowCard";

function Workflows() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
      {/* Display a list of all the workflows of the user. All pages inside the app router by default are server components which means you
        can query the database, get the results (list all the user's workflow) then render them with React and send the rendered component to the client
        which is the browswer. So we are going to use Server components in almost every page of the application
        */}

      <div className="h-full py-6">
        {/* Here we have a server component called UserWorkflows which is an async component. Inside the component we will read the user workflows from the 
            database and render them. We wrap it with Suspense which is a react component because basically Suspense takes something that is async (takes some time to load)
            e.g. when you have a component that queries the database. And while this component is loading, the suspense is going to render the FB component
             */}
        <Suspense fallback={<UserWorflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

// Definition of the UserWorkflowsSkeleton component
function UserWorflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

//Definition of UserWorkflows
async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();

  // If you want to handle exceptions inside a server component
  // try {
  //   const workflows = await GetWorkflowsForUser();
  //   return <div></div>
  // } catch (error) {
  //     <Alert variant={"destructive"}>
  //       <AlertCircle className="w-4 h-4" />
  //       <AlertTitle>Error</AlertTitle>
  //       <AlertDescription>
  //         Something went wrong. Please try again later
  //       </AlertDescription>
  //     </Alert>
  // }

  // workflows is not defined
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  // There is no workflow for the user
  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>

        {/* Create a dialog that allow us to create new workflows. Since we need to call a server action inside, install tanstack query in order to use the 'useMutation' Hook in order to call it */}
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  // retrieve the user workflows from the database by caling prisma inside UserWorkflows component. But instead of doing that, we create a server action to maintain the code structure
  // return <pre>{JSON.stringify(workflows, null, 4)}</pre>; returns the different workflows created in the database
  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}

export default Workflows;
