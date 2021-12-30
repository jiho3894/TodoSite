import React from "react";
import { useForm } from "react-hook-form";

interface Iform {
  todo: string;
}

const ToDoList = () => {
  const {register , handleSubmit , setValue} = useForm<Iform>()
  const handleValid = (data : Iform) => {
    console.log(data)
    setValue("todo", "")
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("todo")} placeholder="write to do..." />
        <button>submit</button>
      </form>
    </>
  );
};

export default ToDoList;
