import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function NavbarSearch () {
  const navigate = useNavigate();

  const [userMatches, setUserMatches] = useState([]);
  const [displaySearches, setDisplaySearches] = useState(false);

  const [input, setInput] = useState('');
  const handleOnChange = (ev) => {
    setInput(ev.target.value);
  }

  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/search?searchStr=' + input)
      .then((response) => setUserMatches(response.data))
      .then(() => {
        if (input !== '' && focused === true) {
          setDisplaySearches(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [input, focused]);

  useEffect(() => {
    if (input === '' || focused === false) {
      setDisplaySearches(false);
    }
  }, [input, focused]);

  useEffect(() => {
    if (input !== '' && focused === true) {
      setDisplaySearches(true);
    }
  }, [focused]);


  return (
    <div>
      <form>   
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" onChange={handleOnChange} onFocus={onFocus} onBlur={onBlur} class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users" required />
        </div>
      </form>
      <div id="dropdown" class="absolute my-1 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
        <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
          {displaySearches === false ? null : userMatches.map((username) => (
            <li onClick={() => {navigate('/profile/' + username)}} class="py-2 px-4 rounded hover:bg-gray-600 hover:cursor-pointer">
              <p>{username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavbarSearch;