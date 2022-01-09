import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const TrashBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease-in;
  svg {
    color: gold;
  }
  &:hover {
    transform: scale(1.3);
    svg {
      color: red;
    }
  }
`;

const Trash = styled.div`
  position: absolute;
`;

const DeleteCard = () => {
  return (
    <TrashBox>
      <Droppable droppableId="trash-card">
        {(magic) => (
          <Trash ref={magic.innerRef} {...magic.droppableProps}>
            {magic.placeholder}
          </Trash>
        )}
      </Droppable>
      <FontAwesomeIcon icon={faTrash} size={"2x"} color={"white"} />
    </TrashBox>
  );
};

export default DeleteCard;
