import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { saveTodos, toDoState } from "../model/atom";

interface IAddBoard {
  category: string;
}

const AddBoard = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IAddBoard>();
  const onValid = ({ category }: IAddBoard) => {
    if (category === "") return;
    setToDos((allBoards) => {
      return {
        [category]: [],
        ...allBoards,
      };
    });
    setValue("category", "");
  };
  useEffect(() => {
    saveTodos(toDos);
  }, [toDos]);
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("category", { required: true })}
        placeholder="add board"
      ></input>
    </form>
  );
};
export default AddBoard;
