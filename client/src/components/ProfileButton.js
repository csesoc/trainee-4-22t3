import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileButton({ user, setUser }) {
  useEffect(() => {
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
        } else if (error.response.request.status === 403) {
          alert('Your login session has expired.');
          logout();
        }
      })
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    navigate(0);
  }

  const navigate = useNavigate();

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div tabindex="1" onFocus={onFocus} onBlur={onBlur}>
      <img 
        class="w-10 h-10 rounded-full object-cover hover:cursor-pointer" 
        src={user.profileImgUrl} alt="Rounded avatar" 
        onError={(e) => {
          e.target.src = 'https://i.stack.imgur.com/l60Hf.png';
        }}
      />
      <div
        id="dropdown"
        className="absolute my-1 w-32 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 object-left"
      >
        <ul
          className="text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {
            focused === false
              ? null
              : 
              <div>
                <li
                  onClick={() => {
                    navigate('/profile/' + user.username);
                    navigate(0);
                  }}
                  className="py-2 px-4 rounded hover:bg-gray-600 hover:cursor-pointer"
                  title="Your profile"
                >   
                  <p>Profile</p>
                </li>
                <li
                  onClick={() => {
                    navigate('/settings/');
                    navigate(0);
                  }}
                  className="py-2 px-4 rounded hover:bg-gray-600 hover:cursor-pointer"
                  title="User settings"
                >   
                  <p>Settings</p>
                </li>
                <li
                  onClick={logout}
                  className="py-2 px-4 rounded hover:bg-gray-600 hover:cursor-pointer"
                  title="Logout"
                >   
                  <p>Logout</p>
                </li>
              </div>
          }
        </ul>
      </div>
    </div>
  )
}

export default ProfileButton;
