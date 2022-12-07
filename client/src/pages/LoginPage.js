import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LoginPage({ user, setUser }) {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  /*  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {

    axios
      .get('http://localhost:5000/users/login')
      .then((response) => setIdentiFunners(response.data));
    // .then(setSuccess(false));
    return () => setSuccess(false);
  }, [success]);
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/users/login', {
        email,
        password,
      })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate(`/profile/${response.data.username}`);
      })
      .catch((error) => {
        alert('Email/password did not link to an associated account');
      });
  };
  return (
    <section>
      <Navbar user={user} setUser={setUser} />
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://i.imgur.com/9HLSU2T.png"
              className="w-full"
              alt="Phone"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <a
                  href="#!"
                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default LoginPage;
