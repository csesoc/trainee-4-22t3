import { useNavigate } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import NavbarLogo from './NavbarLogo';

function Navbar() {
  const navigate = useNavigate();

  return (
    <section>
      <nav class="py-2 bg-[#252526]">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <NavbarLogo />
          <NavbarSearch />
          <button onClick={() => {navigate('/login')}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" title="Login">Login</button>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
