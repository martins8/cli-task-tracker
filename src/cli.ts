import Task, { TaskStatus } from "./task";
import { loadTasks, saveTasks } from "./storage";

export interface Options {
  add: (description: string) => string;
  update: (id: number, description: string) => string;
  delete: (id: number) => string;
  markProgress: (id: number) => string;
  markDone: (id: number) => string;
  list: () => Task[];
  listByStatus: (status: TaskStatus) => Task[];
}

export default class CLI implements Options {
  tasks: Task[];
  constructor() {
    this.tasks = loadTasks() as Task[];
    this.instanceAllTasks();
  }
  // ============ CLI methods ====================

  // add a new task with description
  public add(description: string): string {
    const id = this.getNextId();
    this.tasks.push(new Task({ id: id, description: description }));
    saveTasks(this.tasks);
    return `Task added successfully (ID: ${id})`;
  }

  // update task description by id
  public update(id: number, description: string): string {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.updateDescription(description);
      saveTasks(this.tasks);
      return `Task updated successfully (ID: ${id})`;
    }
    return `Task not found (ID: ${id})`;
  }

  // delete a task by id
  public delete(id: number): string {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return `Task not found (ID: ${id})`;
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
    saveTasks(this.tasks);
    return `Task deleted successfully (ID: ${id})`;
  }

  // list all tasks
  public list(): Task[] {
    return this.tasks;
  }

  // list tasks by status
  public listByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  // mark a task as done by id
  public markDone(id: number): string {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.markStatus("done");
      saveTasks(this.tasks);
      return `Task marked as done (ID: ${id})`;
    }
    return `Task not found (ID: ${id})`;
  }

  // mark a task as in progress by id
  public markProgress(id: number): string {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.markStatus("in-progress");
      saveTasks(this.tasks);
      return `Task marked as in progress (ID: ${id})`;
    }
    return `Task not found (ID: ${id})`;
  }

  // ============ helper methods ====================

  // instance all tasks loaded from storage to Task class instances
  private instanceAllTasks() {
    this.tasks = this.tasks.map((task) => new Task(task));
  }

  // get the next id for a new task
  private getNextId(): number {
    if (this.tasks.length > 0) {
      return Math.max(...this.tasks.map((task) => task.id)) + 1;
    }
    return 1;
  }
  // ===================================================
}
