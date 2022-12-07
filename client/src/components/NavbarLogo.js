import { useNavigate } from 'react-router-dom';

function NavbarLogo() {
  const navigate = useNavigate();

  return (
    <div title="identiFun">
      <a href="http://localhost:3000/" class="flex items-center">
        <img
          src="https://i.imgur.com/ylqbx7Y.png"
          class="w-14 h-14"
          alt="identiFun logo"
        />
        <span class="text-xl font-semibold dark:text-white">
          identiFun
        </span>
      </a>
    </div>
  );
}

export default NavbarLogo;
