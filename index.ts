import cli from "./src/cli";
import { TaskStatus } from "./src/task";
const CLI = new cli();
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case "add":
    const addResult = CLI.add(args.join(" "));
    console.log(addResult);
    break;

  case "update":
    const updateResult = CLI.update(parseInt(args[0]), args.slice(1).join(" "));
    console.log(updateResult);
    break;

  case "delete":
    const deleteResult = CLI.delete(parseInt(args[0]));
    console.log(deleteResult);
    break;

  case "list":
    if (args.length > 0) {
      //check if the provided status is valid
      const isTaskStatus = (value: string): value is TaskStatus =>
        value === "todo" || value === "in-progress" || value === "done";
      if (!isTaskStatus(args[0])) {
        console.log(`Invalid status: ${args[0]}`);
        process.exit(1);
      }
      //==================================================
      //list by status
      const status: TaskStatus = args[0];
      const tasksByStatus = CLI.listByStatus(status);
      console.log(`Listing tasks with status "${status}":`);
      console.log(tasksByStatus);
    } else {
      //list all tasks
      const allTasks = CLI.list();
      console.log("Listing all tasks:");
      console.log(allTasks);
    }
    break;

  case "mark-in-progress":
    const markInProgressResult = CLI.markProgress(parseInt(args[0]));
    console.log(markInProgressResult);
    break;

  case "mark-done":
    const markDoneResult = CLI.markDone(parseInt(args[0]));
    console.log(markDoneResult);
    break;

  default:
    console.log("Unknown command:", command);
    break;
}
