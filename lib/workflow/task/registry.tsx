import { LaunchBrowserTask } from "./LaunchBrowser";

export const TaskRegistry = {
  LAUNCH_BROSWER: LaunchBrowserTask,
};

// Next thing is to display the LaunchBrowserTask in the FlowEditor. So we need to create a function
// that takes a task and converts it into a node that can be rendered in the flow Editor
