import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Demo from './pages/Demo';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    if (user !== null) {
      axios
        .get('http://localhost:5000/users/get', {
          headers: {
            Authorization: 'Bearer ' + user.token,
          }
        })
        .then((response) => {
          const userDetails = response.data
          setUser({
            uId: userDetails._id,
            username: userDetails.username,
            email: userDetails.email,
            profileImgUrl: userDetails.profileImgUrl ? userDetails.profileImgUrl : 'https://i.stack.imgur.com/l60Hf.png',
            token: user.token
          });
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((error) => {
          if ('errors' in error.response.data) {
            const errorType = Object.keys(error.response.data.errors)[0];
            alert(error.response.data.errors[errorType].message);
          } else {
            alert(error.response.data.error);
          }
        })
      }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
        <Route path="/register" element={<RegisterPage user={user} setUser={setUser} />} />
        <Route path="/demo" element={<Demo />} />
        <Route
          path="/profile/:username"
          element={<ProfilePage user={user} setUser={setUser} />}
        />
        <Route path="/settings" element={<SettingsPage user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
