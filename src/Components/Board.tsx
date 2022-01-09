import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, saveTodos, toDoState } from "../model/atom";
import { Form, Title } from "../Style/styleComponents";
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

const Wrapper = styled(motion.div)`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const Board = ({ toDos, boardId }: IBoard) => {
  const [id, setId] = useState<null | string>(null);
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
      const boards = { ...allBoards };
      delete boards[boardId];
      return { ...boards };
    });
  };
  useEffect(() => {
    saveTodos(localState);
  }, [localState]);
  console.log(id);
  return (
    <>
      <Overlay onClick={() => setId(boardId)} key={boardId} layoutId={boardId}>
        <Box layoutId={boardId} style={{ width: 400, height: 200 }}>
          {boardId}
        </Box>
      </Overlay>
      <AnimatePresence>
        {id !== null ? (
          <Wrapper
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            layoutId={boardId}
          >
            <Title onClick={() => setId(null)}>{boardId}</Title>
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
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Board;
