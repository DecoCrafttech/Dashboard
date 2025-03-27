import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BlogHandlingPage from './components/Blog';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import JobHandlingPage from './components/JobHandlingPage';
// import NotFound from './components/NotFound'; // Ensure this path is correct

function App() {
  return (
    <Routes basename={process.env.PUBLIC_URL}>
      <Route element={<Dashboard />} >
        <Route index element={<BlogHandlingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/jobs' element={<JobHandlingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
