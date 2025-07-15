import { useEffect, useState } from "react";
import api from "../services/goalService";

function AddGoal({ fetchGoals, show }) {

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    dueDate: new Date
  })

  const [date, setDate] = useState("")

  useEffect(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')

    const newDate = `${yyyy}-${mm}-${dd}`
    setDate(newDate)
  }, [])

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      api.post('/metas/criar', formdata)
        .then(response => {
          console.log("Meta criada com sucesso:", response.data.data);
          setFormdata({ title: "", description: "", dueDate: "" })

          fetchGoals()
        })
        .catch(error => {
          console.log("Erro ao criar meta:", error);
          alert("Erro ao criar meta");
        });
    }
    catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  }

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`} onClick={() => show(false)}>
      <form onSubmit={handleSubmit} className="add-goal modal-content" onClick={e => e.stopPropagation()}>

        <i
          onClick={() => show(false)}
          title="Fechar"
          className="header material-icons">
          close
        </i>
        <label htmlFor="title">Título:
          <input type="text" id="title" name="title" value={formdata.title} onChange={handleChange} required />
        </label>


        <label htmlFor="description">Descrição:
          <textarea type="text" id="description" name="description" value={formdata.description} onChange={handleChange} />
        </label>

        <input type="date" name="dueDate" min={date} value={formdata.dueDate} onChange={handleChange} required />

        <button type="submit">Criar</button>

      </form>
    </div>
  )
}

export default AddGoal;
