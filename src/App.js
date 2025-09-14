import { Route, Routes } from 'react-router-dom';
import './App.css';
import BlogHandlingPage from './components/Blog';
import Teams from './components/TeamPage';
import Dashboard from './components/Dashboard';
import JobHandlingPage from './components/JobHandlingPage';
import BlogDetails from './components/BlogDetails';
import GlobalSettings from './components/GlobalSettings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<BlogHandlingPage />} />
        {/* <Route path="/blog"  element={<BlogList />} /> */}
          <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="teams" element={<Teams />} />
        <Route path="jobs" element={<JobHandlingPage />} />
        <Route path="global-settings" element={<GlobalSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
