import type { User } from "./user";

export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};