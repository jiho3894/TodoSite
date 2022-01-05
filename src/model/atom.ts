import { atom } from "recoil";

export const loadedTodos = () => {
  const localState = localStorage.getItem("state");
  if (localState !== null) {
    return JSON.parse(localState);
  }
};

export const saveTodos = (todo: IToDos) => {
  localStorage.setItem("state", JSON.stringify(todo));
};

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDos {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDos>({
  key: "toDos",
  default: loadedTodos() ?? {},
});
