import { useForm } from "react-hook-form";
import {useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

interface Iform {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<Iform>();
  const handleValid = ({ toDo }: Iform) => {
    setValue("toDo", "");
    setToDos((oldToDo) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDo,
    ]);
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("toDo")} placeholder="write to do..." />
      <button>submit</button>
    </form>
  );
};

export default CreateToDo;
