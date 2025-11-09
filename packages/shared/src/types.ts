export type ID = string;

export interface User {
  _id: ID;
  email: string;
  name: string;
}

export type Role = 'owner' | 'member' | 'viewer';

export interface Project {
  _id: ID;
  key: string;
  name: string;
  ownerId: ID;
}

export interface BoardColumn {
  _id: ID;
  title: string;
  order: number;
  width?: number;
}

export type TicketStatus = 'todo' | 'inprogress' | 'done';

export interface Ticket {
  _id: ID;
  projectId: ID;
  boardId: ID;
  title: string;
  description?: string;
  status: TicketStatus;
  order: number;
  assigneeId?: ID;
  points?: number;
}
