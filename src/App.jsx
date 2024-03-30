import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { add, removeAll, editTask } from "./store/TodoSlice";
function App() {
  const [input, setInput] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editFormVisibility, setEditFormVisibility] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [editedValue, setEditedValue] = useState("");

  //render everytime when we click on a perticular todo
  useEffect(() => {
    setEditedValue(editTodo.text);
  }, [editTodo]);

  //Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") return;
    dispatch(add(input));
    setInput("");
  };
  // handleEditTodo
  const handleEditTodo = (todo) => {
    setEditFormVisibility(true);
    setEditTodo(todo);
  };
  // handleEditTodoSubmit
  const handleEditTodoSubmit = (e) => {
    e.preventDefault();

    if (editedValue === "") return;
    dispatch(
      editTask({
        id: editTodo.id,
        text: editedValue,
        isCompleted: false,
      })
    );
    setEditFormVisibility(false);
  };
  //save data in Local Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className=" relative h-screen w-screen p-4 bg-gradient-to-b from-blue-400 to to-cyan-900">
      <div className="bg-slate-300 max-w-[450px] w-full m-auto shadow-xl p-4 rounded-md flex  flex-col gap-2">
        <div className="flex flex-col gap-2 font-bold text-center">
          <h1 className="text-3xl font-bold text-center text-black hover:scale-110 duration-300">
            Todo App-Redux
          </h1>
          <h2 className="text-2xl">Get things Done!</h2>
        </div>
        {editFormVisibility === false ? (
          <form onSubmit={handleSubmit} className="flex  justify-between gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full outline-none  rounded-sm text-xl p-2"
              type="text"
              placeholder="Write something here..."
            />
            <button className="p-2 border bg-blue-500 hover:bg-blue-600 duration-300 text-white ">
              <MdAdd size={30} />
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleEditTodoSubmit}
            className="flex  justify-between gap-2"
          >
            <input
              value={editedValue || ""}
              onChange={(e) => setEditedValue(e.target.value)}
              className="w-full outline-none  rounded-sm text-xl p-2"
              type="text"
              placeholder="Write something here..."
            />
            <button className="p-2 font-semibold border bg-blue-500 hover:bg-blue-600 duration-300 text-white ">
              EDIT
            </button>
          </form>
        )}
        <ul>
          {/* List Component */}
          <TodoList
            editFormVisibility={editFormVisibility}
            handleEditTodo={handleEditTodo}
          />
        </ul>
        <div className="text-center flex flex-col gap-2">
          {todos.length > 0 && (
            <button
              onClick={() => dispatch(removeAll())}
              className="bg-red-500 font-semibold hover:bg-red-600 hover:text-white duration-300 text-x rounded p-2"
            >
              Remove All
            </button>
          )}
          <p className="font-semibold">
            {todos.length === 0
              ? "Add some task to Do :)"
              : `You have total ${todos.length} Todos`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
