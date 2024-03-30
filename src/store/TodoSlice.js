import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos:[
        {id:1,text:"50 pushup",isCompleted:false},
        {id:2,text:"learn react",isCompleted:true}
    ]
}

export const TodosSlice =createSlice({
    name:"todo",
    initialState,
    reducers:{
        add:(state,action)=>{
            const todo ={
                id:Date.now(),text:action.payload
            }
            state.todos.push(todo);
        },
        remove:(state,action)=>{
            state.todos=state.todos.filter((todo)=>todo.id !== action.payload)
        },
        removeAll:(state)=>{
            state.todos=[];
        },
        taskCompleted:(state,action)=>{
            state.todos.map((item)=>{
                if(item.id===action.payload){
                    item.isCompleted= !item.isCompleted;
                }
            })
        },
        editTask:(state,action)=>{
            // const {id,text,isCompleted}=action.payload;
            // const newTodo=state.find((todo)=>todo.id===id);
            // newTodo.text=text;
            // state.todos.map((todo)=>{
            //     todo.id===action.payload.id ? {...todo,text:action.payload.text}:todo
            // })
            let data=action.payload;
            const updatedArray=[];
            state.todos.map((item)=>{
                if(item.id===data.id){
                    item.id=data.id;
                    item.text=data.text;
                    item.isCompleted=data.isCompleted
                }
                updatedArray.push(item);
            })
        }
    }
})

export const {add,remove,removeAll,taskCompleted,editTask}=TodosSlice.actions
export default TodosSlice.reducer