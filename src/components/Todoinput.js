import React, { useEffect, useState} from "react";
import { v1 as uuidV1 } from "uuid";
import Todolist from "./Todolist";

const Todoinput = () => {

  const [todo, setTodo] = useState(localStorage.getItem('todo')? 
  JSON.parse(localStorage.getItem('todo')): []);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({ task: "", desc: "" });
  const [editItem,setEditItem]=useState({})

  useEffect(() => {
      localStorage.setItem('todo',JSON.stringify(todo))
    }, [todo])

  const todoHandler = () => {
    input.task &&
    localStorage.setItem('todo',JSON.stringify([...(JSON.parse(localStorage.getItem('todo'))),{ task: input.task, id: uuidV1(), desc: input.desc, done: false }]))
      setTodo(JSON.parse(localStorage.getItem('todo')));
    setInput({ task: "", desc: "" });
  };

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const saveHandler=()=>{
    setEdit(false);
    const a=todo.map(v=>{
    return  v.id===editItem.id ? {...v,desc:input.desc,task:input.task} : v
    })
    localStorage.setItem('todo',JSON.stringify(a))
    setTodo(a);
    setInput({desc:'',task:''})
  }

  const pending=todo.filter((v) => {
    return v.done === false;
  }) ;

  const completed = todo.filter((v) => {
    return v.done === true;
  });

  return (
    <div className="sub__container">
    <div className="input__container">
      <h1>TODO APP</h1>
      <input
        type="text"
        onChange={inputHandler}
        name="task"
        value={input.task}
        placeholder="add Your task here"
      />
      <input
        type="text"
        onChange={inputHandler}
        name="desc"
        value={input.desc}
        placeholder="add description"
      />
      {!edit&&<button onClick={todoHandler}>Add</button>}
      {edit&&<button onClick={saveHandler}>Save</button>}
    </div>
     <div className="todo__list">
     <Todolist
       item={pending}
       setTodo={setTodo}
       todo={todo}
       heading="Pending Tasks"
       setEditItem={setEditItem}
       setEdit={setEdit}
       setInput={setInput}
     />
     <Todolist
       item={completed}
       setTodo={setTodo}
       todo={todo}
       heading="Completed Tasks"
       setEditItem={setEditItem}
       setEdit={setEdit}
       setInput={setInput}
       completed
     />
   </div>
   </div>
  );
};

export default Todoinput;
