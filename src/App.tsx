import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./model/atom";
import Board from "./Components/Board";
import { Boards, Container } from "./Style/styleComponents";
import AddBoard from "./Components/AddBoard";
import DeleteCard from "./Components/DeleteCard";

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
  return (
    <>
      <AddBoard />
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards>
        </Container>
        <DeleteCard />
      </DragDropContext>
    </>
  );
}

export default App;
