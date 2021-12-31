import { atom } from "recoil";

export interface ITodo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});