import Task from "./task";
import { loadTasks, saveTasks } from "./storage";

export interface Options {
  add: (description: string) => string;
  update: (id: number, description: string) => string;
  delete: (id: number) => string;
  markProgress: (id: number) => string;
  markDone: (id: number) => string;
  list: () => Task[];
  listByStatus: (status: string) => Task[];
}

export default class CLI implements Options {
  tasks: Task[];
  constructor() {
    this.tasks = loadTasks() as Task[];
    this.instanceAllTasks();
  }

  private instanceAllTasks() {
    this.tasks = this.tasks.map((task) => new Task(task));
  }

  private getNextId(): number {
    if (this.tasks.length > 0) {
      return Math.max(...this.tasks.map((task) => task.id)) + 1;
    }
    return 1;
  }

  public add(description: string): string {
    const id = this.getNextId();
    this.tasks.push(new Task({ id: id, description: description }));
    saveTasks(this.tasks);
    return `Task added successfully (ID: ${id})`;
  }

  public update(id: number, description: string): string {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.updateDescription(description);
      saveTasks(this.tasks);
      return `Task updated successfully (ID: ${id})`;
    }
    return `Task not found`;
  }

  public delete(id: number): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    saveTasks(this.tasks);
    return `Task deleted successfully (ID: ${id})`;
  }

  public list(): Task[] {
    return this.tasks;
  }

  public listByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  public markDone(id: number): string {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.markStatus("done");
      saveTasks(this.tasks);
      return `Task marked as done (ID: ${id})`;
    }
    return `Task not found`;
  }

  public markProgress(id: number): string {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.markStatus("in-progress");
      saveTasks(this.tasks);
      return `Task marked as in progress (ID: ${id})`;
    }
    return `Task not found`;
  }
}
