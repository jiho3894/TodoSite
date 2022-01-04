import { atom } from "recoil";

export interface ITodo {
  id:number;
  text:string;
}

interface IToDos {
  [key: string] : ITodo[];
}

export const toDoState = atom<IToDos>({
  key: "toDos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
