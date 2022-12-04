import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Demo from './pages/Demo';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
