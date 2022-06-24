import React from 'react'

const Modal = ({task,desc,id,modalHandler}) => {
    console.log("modal box")
  return (
    <div className='modal__container'>
        <h1>{task}</h1>
        <p>{desc}</p>
        <i className="fa-solid fa-xmark" onClick={()=>modalHandler(id)}></i>
    </div>

  )
}

export default Modal