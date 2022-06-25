import React, { useState,useEffect } from "react";
import { arrayMoveImmutable } from "array-move";
import { SortableElement, SortableContainer } from "react-sortable-hoc";
import Modal from "./Modal";


const Todolist = ({item,setTodo,todo,heading,setEdit,setEditItem,setInput,completed}) => {

  const [items, setItems] = useState(item);
  const[modal,setModal]=useState([]);

  const SortableItem = SortableElement(
    ({ value }) => {
  
      return (
        <div className="list__item" key={value.id} >
          {modal.includes(value.id)&&<Modal task={value.task} desc={value.desc} modalHandler={modalHandler} id={value.id} />}
          <div className="list__head" onClick={()=>modalHandler(value.id)} >
            <h2>{value.task}</h2>
            <p>{value.desc}</p>
          </div>
          <div className="btn__containers" >
            <button
              onClick={() => editHandler(value.id)}
            
              className="edit__btn"
            >
              Edit
            </button>
            {
              !completed&&<button
              onClick={() => doneTodo(value.id)}
              className="done__btn"
            >
              Done
            </button>
            }
            <button
              onClick={() => deleteTodo(value.id)}
              className="delete__btn"
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
  );
  
  const SortableList = SortableContainer(
    ({ value }) => {
      return (
        <div className="list__container" >
          <h1>{heading}</h1>
          {value.map((item,index) => {
            return <SortableItem value={item} index={index} key={item.id} />;
          })}
        </div>
      );
    }
  );

  useEffect(() => {
    setItems(item)
  }, [item])

    const modalHandler=(id)=>{
      if(modal.includes(id)){
         setModal(modal.filter(v=>{
         return v!==id
        }))
      }
      else{
        setModal([...modal,id])
      }
    }

  const deleteTodo = (id) => {
    let a=todo.filter((v) => {
      return v.id !== id;
    })
    localStorage.setItem('todo',JSON.stringify(a))
    setTodo(JSON.parse(localStorage.getItem('todo')))
  };

  const doneTodo = (id) => {
    let a = todo.map((v) => {
      return v.id === id ? { ...v, done: true } : v;
    });
    localStorage.setItem('todo',JSON.stringify(a))
    setTodo(JSON.parse(localStorage.getItem('todo')));
  };

  const editHandler = (id) => {
    setEdit(true);
    const a = todo.find((v) => {
      return v.id === id;
    });
    setInput({ desc: a.desc, task: a.task });
    setEditItem(a);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };
  
  return <>
  <SortableList value={items} onSortEnd={onSortEnd}  distance={2} />
  </>
};

export default Todolist;
