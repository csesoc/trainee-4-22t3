import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [userMatches, setUserMatches] = useState([]);

  const handleOnChange = (ev) => {
    setInput(ev.target.value);
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/search?searchStr=' + input)
      .then((response) => setUserMatches(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, [input]);

  return (
    <section>
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <div onClick={() => {navigate('/')}} class="flex items-center cursor-pointer">
            <img
              src="https://i.imgur.com/ylqbx7Y.png"
              class="mr-3 h-6 sm:h-9"
              style={{ width: '100px', height: '100px' }}
              alt="identiFun logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              identiFun
            </span>
          </div>

          <div>
            <form>   
              <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" id="default-search" onChange={handleOnChange} class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users" required />
              </div>
            </form>
            <div id="dropdown" class="absolute my-1 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
              <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                {input === '' ? null : userMatches.map((username) => (
                  <li class="py-2 px-4 rounded hover:bg-gray-600 hover:cursor-pointer">
                    <button onClick={() => {navigate('/profile')}}>{username}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <button onClick={() => {navigate('/login')}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
