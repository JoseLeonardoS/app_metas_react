import { useEffect, useState } from "react";
import api from "../services/goalService";
import UpdateGoal from "./UpdateGoal";
import ProgressBar from "./ProgressBar";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";

function GoalCard({ goal, fetchGoals }) {

  const [updateModal, setUpdateModal] = useState(false);
  const [checked, setChecked] = useState(goal.isCompleted);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState(goal.tasks)
  const [taskModal, setTaskModal] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  function fetchTasks() {
    api.get(`/Task/listar-meta-Id/${goal.id}`)
      .then(response => {
        setTasks(response.data.data)
      })
  }

  function handleDelete() {
    api.delete('/metas/deletar/' + goal.id)
      .then(() => {
        setLoading(true);

        fetchGoals()
      })
      .catch(error => {
        console.error("Erro ao excluir meta:", error);
      })
  }

  function completeGoal() {
    const newChecked = !checked;
    setChecked(newChecked);

    api.put('/metas/check', { id: goal.id, isCompleted: newChecked })
      .then(() => {
        fetchGoals();
      })
      .catch(error => {
        console.error("Erro ao atualizar meta:", error);
      });
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
  }


  function updateTaskLocally(updatedTask) {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  function removeTaskLocally(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <div className={"goalCard " + (goal.isCompleted ? "completed " : "incomplete ")}>

      {
        updateModal ? (
          <UpdateGoal goal={goal} show={setUpdateModal} fetchGoals={fetchGoals} />
        ) : null
      }

      {
        taskModal ?
          <AddTask id={goal.id} updtGoals={fetchGoals} onUpdate={fetchTasks} open={setTaskModal} />
          : null
      }


      <div className="goalCard-header">
        <i
          className="material-icons-outlined"
          title={checked ? "Meta concluída" : "Meta não concluída"}
          onClick={completeGoal}
        >
          {checked ? "check_circle" : "radio_button_unchecked"}
        </i>

        <div className="goalCard-buttons">
          <i
            title="Editar meta"
            className="material-icons-outlined"
            onClick={setUpdateModal}
          >
            edit
          </i>

          <i
            title="Excluir meta"
            className={"material-icons-outlined " + (loading ? "loading-icon" : "")}
            onClick={handleDelete}
          >
            {!loading ? "delete" : "autorenew"}
          </i>
        </div>
      </div>

      <div>
        <div className="body">
          <h3>{goal.title}</h3>

          {goal.description != "" ? <p> {goal.description}</p> : null}
        </div>

        <div className="datas">
          <span>
            Criada: {(goal ? formatDate(goal.createdAt) : "N/A")}
          </span>

          <span>
            Prazo: {goal ? formatDate(goal.dueDate) : "N/A"}
          </span>
        </div>
      </div>

      {tasks && tasks.length > 0 ? <ProgressBar tasks={goal.tasks} /> : null}

      <div className="tasks">
        <div className="header">
          <h3>Tarefas</h3>
          <i
            title="Adicionar nova tarefa"
            onClick={() => setTaskModal(true)}
            className="material-icons">
            add
          </i>
        </div>
        <div className="tasks-list" >
          {
            tasks && tasks.length > 0 ? (
              tasks.map(task => (
                <div
                  key={task.id}
                  title="role para ver as tarefas">
                  <TaskItem
                    task={task}
                    fetchGoals={fetchGoals}
                    onUpdate={updateTaskLocally}
                    onDelete={removeTaskLocally}
                  />
                </div>
              ))
            ) : (
              <p>Nenhuma tarefa criada.</p>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default GoalCard;
