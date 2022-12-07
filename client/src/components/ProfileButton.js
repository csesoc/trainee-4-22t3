import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProfileButton({ user }) {
  const navigate = useNavigate();

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);


  return (
    <div tabindex="1" onFocus={onFocus} onBlur={onBlur}>
      <img class="w-10 h-10 rounded-full object-cover hover:cursor-pointer" src={user.profileImgUrl} alt="Rounded avatar"></img>
      <div
        id="dropdown"
        className="absolute my-1 z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 right-24"
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
                >   
                  <p>Profile</p>
                </li>
                <li
                  onClick={() => {
                    navigate('/profile/' + user.username);
                    navigate(0);
                  }}
                  className="py-2 px-4 rounded hover:bg-gray-600 hover:cursor-pointer"
                >   
                  <p>Settings</p>
                </li>
                <li
                  onClick={() => {
                    navigate('/profile/' + user.username);
                    navigate(0);
                  }}
                  className="py-2 px-4 rounded hover:bg-gray-600 hover:cursor-pointer"
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
