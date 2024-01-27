import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let id = 1;
function App() {
  const [todos, setTodos] = useState([{
      id: id,
      title: "Title of Todo 1",
      description: "Todo 1 Description",
      status: true
    }])

  function addTodo() {
    const todoTitle = document.querySelector('#customTodoTitle');
    const todoDescription = document.querySelector('#customTodoDescription');

    const todoTitleText = (!todoTitle.value) ? "Random Todo Title" : todoTitle.value;
    const todoDescriptionText = (!todoDescription.value) ? "Random Todo Description" : todoDescription.value;

    setTodos(todos.concat({
      id: ++id,
      title: todoTitleText,
      description: todoDescriptionText,
      status: false,
    }))
    }
  
  return (
    <div>
      <div>
        <div>Add a todo</div>
        <input type="text" name="title" id="customTodoTitle" placeholder='Todo Title'/>
        <input type="text" name="description" id="customTodoDescription" placeholder='Todo Description'/>
        <br />
        <button onClick={() => {addTodo()}}>Add To List</button>
      </div>
      <h1>Todo List</h1>
      {todos.map(todoItem => {
        return <Todo key={todoItem.id} title={todoItem.title} description={todoItem.description} status={todoItem.status}></Todo>
      })}
    </div>
  )
}

function Todo(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>Status: {props.completed ? "Complete" : "Incomplete"}</p>
      <button>Mark As Complete</button>
    </div>
  )
}

export default App
