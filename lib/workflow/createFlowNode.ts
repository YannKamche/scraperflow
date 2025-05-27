import { TaskType } from "@/types/task";
import { ScraperFlowNode } from "../../types/appNode";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number },
): ScraperFlowNode {
  return {
    // Generates a random UUID
    id: crypto.randomUUID(),
    type: "ScraperFlowNode",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
