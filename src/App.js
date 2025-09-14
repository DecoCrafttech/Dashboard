import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogHandlingPage from "./components/Blog";
import Teams from "./components/TeamPage";
import Dashboard from "./components/Dashboard";
import JobHandlingPage from "./components/JobHandlingPage";
import BlogDetails from "./components/BlogDetails";
import GlobalSettings from "./components/GlobalSettings";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<BlogHandlingPage />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="teams" element={<Teams />} />
          <Route path="jobs" element={<JobHandlingPage />} />
          <Route path="global-settings" element={<GlobalSettings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
