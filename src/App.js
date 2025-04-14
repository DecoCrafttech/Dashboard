import { Route, Routes } from 'react-router-dom';
import './App.css';
import BlogHandlingPage from './components/Blog';
import Teams from './components/TeamPage';
import Dashboard from './components/Dashboard';
import JobHandlingPage from './components/JobHandlingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<BlogHandlingPage />} />
        <Route path="login" element={<Teams />} />
        <Route path="jobs" element={<JobHandlingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
