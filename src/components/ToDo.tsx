import { ITodo } from "../atom";

const ToDo = ({ text, category }: ITodo) => {
  return (
    <>
      <span>{text}</span>
      {category !== "TO_DO" && <button>✔</button>}
      {category !== "DOING" &&<button>⚠</button>}
      {category !== "DONE" &&<button>⭕</button>}
    </>
  );
};
export default ToDo;
