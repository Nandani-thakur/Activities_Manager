



import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo,removeTodo } from './todoSlice';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

function Todo() {
  const { seconds, minutes, hours, days, start, reset } = useStopwatch({ autoStart: false });

  const [input, setInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [activeTodo, setActiveTodo] = useState(null); 
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos); // Select todos from the store
  const navigate = useNavigate();

  const addTodoHandler = () => {
    if (input.trim() !== '') {
      dispatch(addTodo({ text: input, date: startDate }));
      setInput('');
      setStartDate(new Date()); 
    }
  };

  const handleTodoClick = (index) => {
    if (activeTodo === index) {
      const completedTodo = {
        text: todos[activeTodo].text,
        date: todos[activeTodo].date,
        duration: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      };
      const storedData = JSON.parse(localStorage.getItem('completedTodos')) || [];
      const existingEntry = storedData.find(todo => new Date(todo.date).toDateString() === new Date(todos[activeTodo].date).toDateString());
      if (existingEntry) {
        const [prevDays, prevHours, prevMinutes, prevSeconds] = existingEntry.duration.split(/[d|h|m|s]/).map(Number);
        const totalSeconds = (prevDays * 86400 + prevHours * 3600 + prevMinutes * 60 + prevSeconds) + (days * 86400 + hours * 3600 + minutes * 60 + seconds);
        existingEntry.duration = `${Math.floor(totalSeconds / 86400)}d ${Math.floor((totalSeconds % 86400) / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m ${totalSeconds % 60}s`;
      } else {
        storedData.push(completedTodo);
      }
      localStorage.setItem('completedTodos', JSON.stringify(storedData));

      reset();
      setActiveTodo(null);
    } else {
      if (activeTodo !== null) {
        const completedTodo = {
          text: todos[activeTodo].text,
          date: todos[activeTodo].date,
          duration: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        };
        const storedData = JSON.parse(localStorage.getItem('completedTodos')) || [];
        const existingEntry = storedData.find(todo => new Date(todo.date).toDateString() === new Date(todos[activeTodo].date).toDateString());
        if (existingEntry) {
          const [prevDays, prevHours, prevMinutes, prevSeconds] = existingEntry.duration.split(/[d|h|m|s]/).map(Number);
          const totalSeconds = (prevDays * 86400 + prevHours * 3600 + prevMinutes * 60 + prevSeconds) + (days * 86400 + hours * 3600 + minutes * 60 + seconds);
          existingEntry.duration = `${Math.floor(totalSeconds / 86400)}d ${Math.floor((totalSeconds % 86400) / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m ${totalSeconds % 60}s`;
        } else {
          storedData.push(completedTodo);
        }
        localStorage.setItem('completedTodos', JSON.stringify(storedData));
      }
      reset();
      setActiveTodo(index);
      start();
    }
  };

  const goToDashboard = () => {
    if (activeTodo !== null) {
      const completedTodo = {
        text: todos[activeTodo].text,
        date: todos[activeTodo].date,
        duration: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      };
      const storedData = JSON.parse(localStorage.getItem('completedTodos')) || [];
      const existingEntry = storedData.find(todo => new Date(todo.date).toDateString() === new Date(todos[activeTodo].date).toDateString());
      if (existingEntry) {
        const [prevDays, prevHours, prevMinutes, prevSeconds] = existingEntry.duration.split(/[d|h|m|s]/).map(Number);
        const totalSeconds = (prevDays * 86400 + prevHours * 3600 + prevMinutes * 60 + prevSeconds) + (days * 86400 + hours * 3600 + minutes * 60 + seconds);
        existingEntry.duration = `${Math.floor(totalSeconds / 86400)}d ${Math.floor((totalSeconds % 86400) / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m ${totalSeconds % 60}s`;
      } else {
        storedData.push(completedTodo);
      }
      localStorage.setItem('completedTodos', JSON.stringify(storedData));
    }
    navigate('/dashboard');
  };

  const handleRemoveTodo = (index) => {
    dispatch(removeTodo(index));
  };

  return (
    <div className='container mx-auto py-10 px-4'>
      <div className='flex flex-col items-center mb-10'>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='rounded-lg p-2 border border-gray-300 shadow-sm mb-4' />
        <div className="flex justify-center items-center gap-3 mb-4">
          <input
            type='text'
            className='rounded-lg p-3 border border-gray-300 shadow-sm w-full max-w-md'
            placeholder="Add Activity"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors' onClick={addTodoHandler}>
            Add 
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ul className='w-full max-w-3xl mx-auto'>
          {todos.map((todo, index) => (
            <li
              className={`flex justify-between items-center p-4 border rounded-lg shadow-sm mb-3 transition-colors ${activeTodo === index ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'}`}
              key={index}
              onClick={() => handleTodoClick(index)}
            >
              <div className='text-lg'>{todo.text}</div>
              {activeTodo === index && (
                <div className='text-xl font-mono'>
                  <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                </div>
              )}
              <button
                className='ml-4 bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition-colors'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent click event
                  handleRemoveTodo(index);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-center mt-10'>
        <button className='bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition-colors' onClick={goToDashboard}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Todo;
