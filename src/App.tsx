import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./model/atom";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const Container = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 800px;
`;

export const Boards = styled(motion.div)`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const box = {
  invisible: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.5 },
  }),
};

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination.droppableId === "trash-card") {
      setToDos((allBoards) => {
        const delCard = [...allBoards[source.droppableId]];
        delCard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: delCard,
        };
      });
      return;
    }
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const copy = [...allBoards[source.droppableId]];
        const objcopy = copy[source.index];
        copy.splice(source.index, 1);
        copy.splice(destination?.index, 0, objcopy);
        return {
          ...allBoards,
          [source.droppableId]: copy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const objcopy = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, objcopy);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destinationBoard,
        };
      });
    }
  };
  const [visible, setVisible] = useState(1);
  const [isBack, setIsBack] = useState(false);
  const nextPlease = () => {
    setIsBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setIsBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <>
      <AddBoard />
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <AnimatePresence custom={isBack}>
            <Boards
              custom={isBack}
              variants={box}
              initial="invisible"
              animate="visible"
              exit="exit"
              key={visible}
            >
              {Object.keys(toDos).map((boardId) => (
                <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
              ))}
            </Boards>
          </AnimatePresence>
        </Container>
        <button onClick={prevPlease}>prev</button>
        <button onClick={nextPlease}>next</button>
      </DragDropContext>
    </>
  );
}

export default App;
