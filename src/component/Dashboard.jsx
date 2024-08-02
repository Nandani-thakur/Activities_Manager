


function Dashboard() {
    const storedData = JSON.parse(localStorage.getItem('completedTodos')) || [];
  
    // Function to aggregate todos by date
    const aggregateTodosByDate = (todos) => {
      const aggregated = {};
  
      todos.forEach(todo => {
        const date = new Date(todo.date).toDateString();
        if (!aggregated[date]) {
          aggregated[date] = { text: todo.text, date: todo.date, duration: todo.duration };
        } else {
          const [days, hours, minutes, seconds] = todo.duration.split(/[d|h|m|s]/).map(Number);
          const [prevDays, prevHours, prevMinutes, prevSeconds] = aggregated[date].duration.split(/[d|h|m|s]/).map(Number);
          const totalSeconds = (prevDays * 86400 + prevHours * 3600 + prevMinutes * 60 + prevSeconds) + (days * 86400 + hours * 3600 + minutes * 60 + seconds);
          aggregated[date].duration = `${Math.floor(totalSeconds / 86400)}d ${Math.floor((totalSeconds % 86400) / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m ${totalSeconds % 60}s`;
        }
      });
  
      return Object.values(aggregated);
    };
  
    const aggregatedTodos = aggregateTodosByDate(storedData);
  
    return (
      <div className='container mx-auto py-10 px-4'>
        <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
        <ul className='w-full max-w-3xl mx-auto'>
          {aggregatedTodos.length > 0 ? (
            aggregatedTodos.map((todo, index) => (
              <li key={index} className='flex justify-between items-center p-4 border rounded-lg shadow-sm mb-3'>
                <div>
                  <div className='text-lg font-semibold'>{todo.text}</div>
                  <div className='text-sm text-gray-600'>{new Date(todo.date).toLocaleDateString()}</div>
                </div>
                <div className='text-xl font-mono'>{todo.duration}</div>
              </li>
            ))
          ) : (
            <div className='text-lg text-gray-500'>No completed todos yet.</div>
          )}
        </ul>
      </div>
    );
  }
  
  export default Dashboard;
  