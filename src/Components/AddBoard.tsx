import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { saveTodos, toDoState } from "../model/atom";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("category", { required: true })}
        placeholder="add board"
      ></input>
    </Form>
  );
};
export default AddBoard;
