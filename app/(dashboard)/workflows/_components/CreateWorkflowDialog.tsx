// A folder name prefixed by '_' are private folders in nextjs meaning that folder and all sub folder will not be considered by the routing system
"use client";

import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layers2Icon, Loader2 } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { useForm } from "react-hook-form";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  // Definition of the form
  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  // Call the server action (createWorkflow) on button click. We will do it by creating a mutation with react query
  const { mutate, isPending } = useMutation({
    // When we call the mutate property deconstructed from the useMutation, it will trigger the CreateWorkflow server action
    // isPending will let us know if the mutation is in progress
    mutationFn: CreateWorkflow,

    // Function triggered if the mutation is completed successfully (We will show a toaster with success or error message. To do it nwith shadc, we have to update the main layer file)
    onSuccess: () => {
      toast.success("Workflow created", { id: "create-workflow" }); // The id is useful because when we are going to click the proceed button, it will show our loading toaster and we will updated that toaster to a success or error toaster
    },

    // Function that is triggered when mutation fails
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
    },
  });

  // Define the onSubmit function that will be called when submitting the form
  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values); //values is an object with name and description which is passed to the CreateWorkflow server action which takes a form with CreateWorkflowSchemaType
    },
    [mutate],
  ); // We use useCallback because we don't want to re-calculate on each re-render the onSubmit function but only when the dependency array changes. IN this case, the dependency will be the mutate function

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset(); //reset the form when workflow creation flow fails
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />

        {/* Define the form */}
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                // The control field is used by react hook form to control the form field
                control={form.control}
                // The name of the field
                name="name"
                // The render function renders the form item
                render={({ field }) => (
                  <FormItem>
                    {/* Contains a form label with 'Name' within it */}
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                // The control field is used by react hook form to control the form field
                control={form.control}
                // The name of the field
                name="description"
                // The render function renders the form item
                render={({ field }) => (
                  <FormItem>
                    {/* Contains a form label with 'Name' within it */}
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.{" "}
                      <br />
                      This is optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : "Proceed"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
