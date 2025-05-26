"use client";

import { Workflow } from "@/lib/generated/prisma";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          {/* The FlowEditor is where our actual editor will live which in fact is the place with the nodes etc.
                We wrap it inside the Editor component because the editor will also include other parts of our interface like
                the Topbar with Button for Save, Run and so on. And for all these to work correctly, they need to 
                be Children of the react flow provider component*/}
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
