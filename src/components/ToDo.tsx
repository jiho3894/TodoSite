import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, ITodo ,toDoState } from "../atom";

const ToDo = ({ text, category, id }: ITodo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newTODO = { text, id, category: name as any};
      return [
        ...oldToDos.slice(0, targetIndex),
        newTODO,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <div>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories?.TO_DO} onClick={onClick}>
          ✔
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          ⚠
        </button>
      )}
      {category !== Categories.DONE && (
        <button name="DONE" onClick={onClick}>
          ⭕
        </button>
      )}
    </div>
  );
};
export default ToDo;
