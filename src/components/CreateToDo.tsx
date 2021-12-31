import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

interface Iform {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<Iform>();
  const handleValid = ({ toDo }: Iform) => {
    setValue("toDo", "");
    setToDos((oldToDo) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
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
