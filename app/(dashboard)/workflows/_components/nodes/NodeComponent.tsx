import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";

// custom UI for the nodes
// We use memo to avoid unnecessary re-renders
const NodeComponent = memo((props: NodeProps) => {
  return <NodeCard nodeId={props.id}>ScraperFlowNode</NodeCard>;
});

export default NodeComponent;

// We need this because the component is wrapped by memo so we don't know the name otherwise
NodeComponent.displayName = "NodeComponent";
