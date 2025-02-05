import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HealthAdvisors from './pages/HealthAdvisors';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import GeneralUsers from './components/GeneralUsers';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/health-advisors"
          element={
            <ProtectedRoute>
              <HealthAdvisors />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<ProtectedRoute><GeneralUsers/></ProtectedRoute>}/>
        <Route
          path="/chat/:conversationId"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;