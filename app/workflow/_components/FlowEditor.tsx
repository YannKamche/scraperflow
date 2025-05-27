"use client";

import { Workflow } from "@/lib/generated/prisma";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React from "react";

import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "@/app/(dashboard)/workflows/_components/nodes/NodeComponent";

//Tells the FlowEditor to use the NodeComponent defined as the default UI for the nodes
const nodeTypes = {
  ScraperFlowNode: NodeComponent,
};

function FlowEditor({ workflow }: { workflow: Workflow }) {
  // Definition of what we need for our workflow which are nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
    <main className="h-full w-full">
      {/* Here we are basically telling ReactFlow the nodes and edges we have. And also setting the callbacks that needs to be called
        when a node or an edge is updated*/}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;

//A node is essentially an object that contains an id, a position and a data property which is an object which contains arbitrary data
