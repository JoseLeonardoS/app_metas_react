import { useState } from "react"
import api from "../services/goalService"

function AddTask({ id, onUpdate, updtGoals, open }) {

  const [title, setTitle] = useState("")
  const [task, setTask] = useState({
    goalId: '',
    title: ''
  })

  function handleChange(e) {
    setTitle(e.target.value)
    setTask({ goalId: id, title: e.target.value })
  }

  function handleClick() {
    api.post("/Task/criar", task)
      .then(() => {
        setTitle("")
        open(false)
        onUpdate()
        updtGoals()
      })
      .catch(e => {
        console.log('Erro: ', e)
      })
  }

  return (
    <div className={`addTask-modal modal-overlay ${open ? 'show' : ''}`} onclick={() => open(false)}>
      <input type="text" name="title" value={title} placeholder="Título da tarefa" onChange={handleChange} />
      <div className="buttons">
        <i
          onClick={handleClick}
          className="material-icons"
        >
          check
        </i>
        <i
          onClick={() => open(false)}
          className="material-icons"
        >
          close
        </i>
      </div>
    </div>
  )
}

export default AddTask
