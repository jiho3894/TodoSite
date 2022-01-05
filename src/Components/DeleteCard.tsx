import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";
import { Trash, TrashBox } from "../Style/styleComponents";

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
