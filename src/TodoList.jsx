import React from "react";
//icons
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
//images
import checked from "./assets/checked.png";
import radio from "./assets/radio.png";
import { useSelector, useDispatch } from "react-redux";
import { remove, taskCompleted } from "./store/TodoSlice";
function Todo({ editFormVisibility, handleEditTodo }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return (
    <>
      {/* Rendering ListItem */}
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-blue-100 capitalize my-2 p-4 text-[16px]"
        >
          <div className="flex items-center gap-2 ">
            {editFormVisibility === false && (
              <img
                onClick={() => dispatch(taskCompleted(todo.id))}
                src={todo.isCompleted ? checked : radio}
                alt=""
                className="w-6 cursor-pointer"
              />
            )}
            <p className={`font-bold ${todo.isCompleted && "line-through"}`}>
              {todo.text}
            </p>
          </div>
          {/* buttons */}
          <div className="flex gap-2">
            {editFormVisibility === false && (
              <>
                <button onClick={() => handleEditTodo(todo)}>
                  <BiEdit size={25} />
                </button>
                <button onClick={() => dispatch(remove(todo.id))}>
                  <MdDelete size={25} />
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </>
  );
}

export default Todo;
