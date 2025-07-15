import { useState } from "react";
import api from "../services/goalService";

function UpdateGoal({ goal, show, fetchGoals }) {

  const [formdata, setFormdata] = useState({
    title: '',
    description: ''
  });

  function handleSubmit(e) {
    e.preventDefault();

    api.put('/metas/atualizar', { id: goal.id, title: formdata.title, description: formdata.description })
      .then(response => {
        setFormdata({ title: "", description: "" });
        show(false);

        fetchGoals()
      })
      .catch(error => {
        console.error("Erro ao atualizar meta:", error);
        alert("Erro ao atualizar meta");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  }

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`} onClick={() => show(false)}>

      <form
        className="modal-content"
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
      >

        <i
          onClick={() => show(false)}
          title="Fechar"
          className="material-icons">
          close
        </i>

        <h1>Atualizar Meta</h1>

        <label htmlFor="title">
          Título:
          <input type="text" name="title" value={formdata.title} onChange={handleChange} required />
        </label>

        <label htmlFor="description">
          Descrição:
          <textarea name="description" value={formdata.description} onChange={handleChange}></textarea>
        </label>

        <button type="submit">Atualizar</button>

      </form>
    </div>
  );
}

export default UpdateGoal;
