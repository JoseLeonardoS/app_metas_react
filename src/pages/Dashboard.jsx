import { useState, useEffect } from "react";
import api from "../services/goalService";
import GoalCard from "../components/GoalCard";
import AddGoal from "../components/AddGoal";
import "../styles/components/loadicon.scss";
import GoalBoard from "../components/GoalBoard";

function Dashboard() {

  const [goals, setGoals] = useState(null);
  const [msg, setMsg] = useState(null);
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    fetchGoals()
  }, []);

  function fetchGoals() {
    api.get('/metas/listar')
      .then(response => {
        setGoals(response.data.data);
        if (response.data.message == "Nenhuma meta encontrada.") {
          setMsg(response.data.message);
        }

        // console.log(response.data.data);
        // console.log(response.data.message);
      })
      .catch(error => {
        console.error("Erro ao buscar metas:", error);
      });

    console.log("buscou")
  }

  return (
    <div className="dashboard">

      <GoalBoard goals={goals} setCreateModal={setCreateModal} />

      {
        createModal ? (
          <AddGoal fetchGoals={fetchGoals} show={setCreateModal} />
        ) : null
      }

      {
        goals ? (
          <div className="goal-list">
            {goals.map(goal => (
              <GoalCard key={goal.id} goal={goal} fetchGoals={fetchGoals} />
            ))}
          </div>
        ) : (
          msg ? (
            <p>{msg}</p>
          ) : (
            <p> Carregando metas <i className="material-icons loading-icon">autorenew</i> </p>
          )
        )
      }
    </div>
  );
}

export default Dashboard;
