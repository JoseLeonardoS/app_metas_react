# 🎯 App Metas Frontend

Frontend da aplicação **Metas**, desenvolvido em **React + Vite**, com **Sass** para estilização e deploy realizado no **GitHub Pages**.  
Este projeto consome a API desenvolvida em **ASP.NET Core** (Entity Framework InMemory) e permite o gerenciamento de **Metas (Goals)** e **Tarefas (Tasks)**.

---

## 🚀 Tecnologias Utilizadas
- **React Js**
- **Vite**
- **Sass (SCSS)**
- **Axios** (consumo da API)
- **GitHub Pages** (deploy do frontend)

---

## 🔗 Links Importantes
- 📂 **Backend Repository:** [Clique aqui](https://github.com/JoseLeonardoS/app-metas-api)
- 🌐 **Live Demo (Fullstack):** [Acesse aqui](https://joseleonardos.github.io/app_metas_react/)  

---

## 📌 Funcionalidades
- ✅ Criar, listar, atualizar e deletar **Metas**  
- ✅ Marcar metas como concluídas  
- ✅ Criar, listar, atualizar e deletar **Tarefas**  
- ✅ Visualizar progresso das metas com **barra de progresso**  
- ✅ Interface organizada em **Dashboard** para melhor experiência  

---

## 📂 Estrutura de Pastas

```bash
src/
 ┣ components/         
 ┃ ┣ AddGoal.jsx
 ┃ ┣ AddTask.jsx
 ┃ ┣ GoalBoard.jsx
 ┃ ┣ GoalCard.jsx
 ┃ ┣ ProgressBar.jsx
 ┃ ┣ TaskItem.jsx
 ┃ ┗ UpdateGoal.jsx
 ┣ pages/              
 ┃ ┗ Dashboard.jsx
 ┣ services/          
 ┃ ┗ goalService.js    
 ┣ styles/             
 ┃ ┣ components/       
 ┃ ┃ ┣ _addGoalModal.scss
 ┃ ┃ ┣ _addTaskModal.scss
 ┃ ┃ ┣ _goalBoard.scss
 ┃ ┃ ┣ _goalCard.scss
 ┃ ┃ ┣ _modal.scss
 ┃ ┃ ┣ _progressBar.scss
 ┃ ┃ ┣ _taskItem.scss
 ┃ ┃ ┣ _updateGoalModal.scss
 ┃ ┃ ┗ loadIcon.scss
 ┃ ┣ pages/
 ┃ ┃ ┗ _dashboard.scss
 ┃ ┗ main.scss         
 ┣ App.jsx
 ┣ main.jsx
 ┗ index.html
```
