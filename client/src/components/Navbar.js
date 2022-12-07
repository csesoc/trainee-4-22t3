import { useNavigate } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import NavbarLogo from './NavbarLogo';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  return (
    <section>
      <nav className="py-2 bg-[#252526]">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <NavbarLogo />
          <NavbarSearch />
          <div>
            {!user ? (
              <button
                onClick={() => {
                  navigate('/login');
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                title="Login"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  setUser(null);
                  navigate('/');
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                title="Logout"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
