import { TaskType } from "@/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";

//Defining configurations for the LaunchBrowser task
export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch broswer",

  // The reason why we define the icon like this is because we want to have the ability to overwrite the properties
  //e.g. the styles, color or size etc.. of the icon in order parts of the application
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),

  //Define if the task is an entry point task which means that can be the first task of the workflow and in this case is 'True' because
  //a web scraper starts by launching the browser
  isEntryPoint: true,

  //Since in our workflow, we can have a lot of different task types, we will group them in a registry
  //A registry is going to be an object that will group our tasks
};
