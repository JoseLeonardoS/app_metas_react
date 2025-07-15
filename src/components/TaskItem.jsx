import { useRef, useState } from "react";
import api from "../services/goalService";

function TaskItem({ task, onUpdate, onDelete, fetchGoals }) {
  const [checked, setChecked] = useState(task.isDone);
  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState(task.title)

  function handleCheck(e) {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    api.put('/Task/check', { id: task.id, isDone: isChecked })
      .then(() => {
        fetchGoals()
      })
      .catch(error => {
        console.error("Erro ao atualizar tarefa:", error);
        setChecked(!isChecked);
      });
  }

  function handleEdit() {
    setEditTitle(!editTitle)
  }

  function handleChange(e) {
    setTitle(e.target.value)
  }

  function handleUpdate() {
    const newTitle = title
    api.put('/Task/atualizar', { id: task.id, title: newTitle })
      .then(response => {
        onUpdate(response.data.data)
      })
    setTitle(title)
    setEditTitle(false)
  }

  function handleDelete() {
    api.delete(`/Task/deletar/${task.id}`)
      .then(() => {
        onDelete(task.id)
        fetchGoals()
      })
      .catch(error => {
        console.error("Erro ao deletar tarefa:", error);
      });
  }

  return (
    <div className="task-item">

      <div>
        <input type="checkbox" checked={checked} onChange={handleCheck} />
        {
          editTitle ?
            <>
              <input type="text" value={title} onChange={handleChange} />
              <i
                value={title}
                onClick={handleUpdate}
                className="material-icons">
                check_small
              </i>
            </>
            : task.title
        }
      </div>

      <div className="buttons">
        <i
          onClick={handleEdit}
          className="material-icons-outlined">
          edit
        </i>
        <i
          title="Excluir tarefa"
          onClick={handleDelete}
          className="material-icons-outlined">
          delete
        </i>
      </div>
    </div>
  );
}

export default TaskItem;