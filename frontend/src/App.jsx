import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Nav from './components/navigation/Nav';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onRegister={setUser} />} />
        <Route path="/" element={<Home user={user} onLogout={() => setUser(null)} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;