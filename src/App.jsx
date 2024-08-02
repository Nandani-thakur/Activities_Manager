import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import Todo from './component/Todo.jsx';
import Dashboard from './component/Dashboard.jsx'; // Import the Dashboard component

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App