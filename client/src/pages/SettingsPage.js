import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SettingsPage({ user, setUser }) {
	const [username, setUsername] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
    axios
      .put('http://localhost:5000/users/update',
			{
        username: username !== '' ? username : user.username,
        profileImgUrl: imageUrl !== '' ? imageUrl : user.profileImgUrl
      },
			{
				headers: {
					Authorization: 'Bearer ' + user.token,
				}
			})
      .then((response) => {
        setUser(response.data);
				alert('Settings saved!');
        navigate(0);
      })
      .catch((error) => {
        if ('errors' in error.response.data) {
          const errorType = Object.keys(error.response.data.errors)[0];
          alert(error.response.data.errors[errorType].message);
        } else {
          alert(error.response.data.error);
        }
				console.log(error);
      });
	};

  return (
		<section class="flex flex-col h-screen justify-between bg-gray-50 dark:bg-gray-900">
			<Navbar user={user} setUser={setUser} />
			<div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Settings
            </h1>
            <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update username</label>
                <input type="username" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
							<div>
                <label for="imageurl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update profile image</label>
                <input type="imageurl" placeholder="Image URL" onChange={(e) => setImageUrl(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
            </form>
          </div>
        </div>
      </div>
			<Footer />
		</section>
  );
}

export default SettingsPage;
