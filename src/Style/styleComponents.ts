import { motion } from "framer-motion";
import styled from "styled-components";

/* App.tsx*/ 
export const Container = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

/* DraggableCard.tsx */

export const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

/* Board.tsx */
export const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

export const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

/* DeleteCard.tsx*/

export const TrashBox = styled.section`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.3);
    svg {
      color: red;
    }
  }
`;

export const Trash = styled.div`
  width: 50px;
  height: 100px;
`;