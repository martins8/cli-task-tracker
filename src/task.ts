export interface TaskProps {
  id: number;
  description: string;
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TaskStatus = "todo" | "in-progress" | "done";

export default class Task implements TaskProps {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  constructor({ id, description, status, createdAt, updatedAt }: TaskProps) {
    this.id = id;
    this.description = description;
    this.status = status || "todo";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // update task description and updatedAt timestamp
  public updateDescription(description: string) {
    this.description = description;
    this.updatedAt = new Date();
  }

  // update task status and updatedAt timestamp
  public markStatus(status: TaskStatus) {
    this.status = status;
    this.updatedAt = new Date();
  }
}
