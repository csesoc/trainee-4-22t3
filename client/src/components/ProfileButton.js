import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProfileButton({ user, setUser }) {
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
        className="absolute my-1 z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 object-left"
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
                  onClick={() => {
                    localStorage.removeItem('user');
                    setUser(null);
                    navigate('/');
                    navigate(0);
                  }}
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
