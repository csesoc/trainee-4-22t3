import NavbarSearch from './NavbarSearch';
import NavbarLogo from './NavbarLogo';
import ProfileButton from './ProfileButton';

function Navbar({ user, setUser }) {
  return (
    <nav class="sticky z-10 top-0 py-2 bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <NavbarLogo />
        <NavbarSearch />
        <div>
          {!user ? (
            <a
              href="/login"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              title="Login"
            >
              Login
            </a>
          ) : (
            <ProfileButton user={user} setUser={setUser} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
