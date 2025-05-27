import { Node } from "@xyflow/react";
import { TaskType } from "./task";

export interface ScraperFlowNodeData {
  // Make the type flexible by allowing any property with string names and any values. The reason why we are going to this is because
  //what we want is to have at least some properties defined in this ScraperFlowNodeData that we are going to define
  // beyond that we want the user to extend this object with anything they want

  [key: string]: any;

  // type of node
  type: TaskType;

  // In the application, we store all the input value as strings and convert them when needed
  inputs: Record<string, string>;
}

export interface ScraperFlowNode extends Node {
  data: ScraperFlowNodeData;
}
