function GoalBoard({ goals, setCreateModal }) {

  return (
    <div className="goal-board">

      <div className="header">
        <h1>Metas</h1>
        <button onClick={() => setCreateModal(true)}>Nova meta</button>
      </div>

      <div className="text">
        <span>
          Total de metas: {goals ? goals.length : "0"}
        </span>

        <span>
          Concluídas: {goals ? goals.filter(goal => goal.isCompleted).length : '0'}
        </span>
      </div>
    </div>
  )
}

export default GoalBoard;