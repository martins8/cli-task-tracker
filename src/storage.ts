const fs = require("fs");
const path = require("path");
import { TaskProps } from "./task";

const DATA_FILE = path.join(__dirname, "tasks.json");

// load tasks from storage
export function loadTasks(): TaskProps[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data) as TaskProps[];
}

// save tasks to storage
export function saveTasks(tasks: TaskProps[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}
