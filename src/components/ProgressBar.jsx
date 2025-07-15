function ProgressBar({ tasks }) {

  const total = tasks.length;
  const completed = tasks.filter(t => t.isDone).length
  let progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-bar-container">
      <div className="bar-background">
        <div
          className="bar-fill"
          style={{ width: `${progress}%` }}
        />
        <span className="progress-text">{progress}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;