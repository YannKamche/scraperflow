"use client";

import { Workflow } from "@/lib/generated/prisma";
import { ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import React from "react";

function FlowEditor({ workflow }: { workflow: Workflow }) {
  // Definition of what we need for our workflow which are nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
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
      ></ReactFlow>
    </main>
  );
}

export default FlowEditor;
