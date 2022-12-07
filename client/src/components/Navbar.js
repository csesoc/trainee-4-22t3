import { useNavigate } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import NavbarLogo from './NavbarLogo';
import ProfileButton from './ProfileButton';

function Navbar({ user }) {
  const navigate = useNavigate();
  return (
    <nav class="sticky top-0 py-2 bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <NavbarLogo />
        <NavbarSearch />
        <div>
          {!user ? (
              <a 
                href="http://localhost:3000/login"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                title="Login"
              >Login</a>
          ) : (
            <ProfileButton user={user} />
          )}

          {/* (
            <button
              onClick={() => {
                localStorage.removeItem('user');
                setUser(null);
                navigate('/');
                navigate(0);
              }}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              title="Logout"
            >
              Logout
            </button>
          ) */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
