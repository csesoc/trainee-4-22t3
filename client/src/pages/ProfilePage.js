import { useState, useEffect } from 'react';
import axios from 'axios';
import TestItem from '../components/TestItem';

function ProfilePage({ user }) {
  console.log(user);
  const [identiFunners, setIdentiFunners] = useState({});
  const [success, setSuccess] = useState(false);
  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {
    axios
      .get('http://localhost:5000/items/get', {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((response) => setIdentiFunners(response.data))
      .catch((err) => {
        console.log(err);
      });
    return () => setSuccess(false);
  }, [success]);
  return (
    <section className="h-screen">
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <a href="https://flowbite.com/" class="flex items-center">
            <img
              src="https://i.imgur.com/ylqbx7Y.png"
              className="mr-3 h-6 sm:h-9 w-50 h-50"
              alt="identiFun logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              identiFun
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <a
            class="dropdown-toggle flex items-center hidden-arrow"
            href="/"
            id="dropdownMenuButton2"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://mdbootstrap.com/img/new/avatars/2.jpg"
              class="rounded-full"
              style={{ height: '50px', width: '50px' }}
              alt=""
              loading="lazy"
            />
          </a>
        </div>
      </nav>
      <div className="grid md:grid-cols-2 lg:grid-cols-2">
        {Object.keys(identiFunners).map((category) => (
          <TestItem
            category={category}
            items={identiFunners[category]}
            setSuccess={setSuccess}
          />
        ))}
      </div>
      <footer class="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-900">
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{' '}
          <a href="https://flowbite.com/" class="hover:underline">
            identiFun™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </section>
  );
}

export default ProfilePage;
