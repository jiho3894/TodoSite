import { useRecoilValue } from "recoil";
import { toDoState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);
  return (
    <>
      <CreateToDo/>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id}{...toDo}/>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
