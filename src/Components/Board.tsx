import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, saveTodos, toDoState } from "../model/atom";
import { Form, Title, Wrapper } from "../Style/styleComponents";
import DraggableCard from "./Card";

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

interface IBoard {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Board = ({ toDos, boardId }: IBoard) => {
  const [localState, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onVaild = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const handleDelete = () => {
    setToDos((allBoards) => {
      const boards = {...allBoards};
      delete boards[boardId];
      return { ...boards };
    });
  };
  useEffect(() => {
    saveTodos(localState);
  }, [localState]);
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <div onClick={handleDelete}>delete</div>
      <Form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder="todo write"
        ></input>
        <button>click</button>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
