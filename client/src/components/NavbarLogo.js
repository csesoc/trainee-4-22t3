import { useNavigate } from 'react-router-dom';

function NavbarLogo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate('/');
      }}
      class="flex items-center cursor-pointer"
      title="identiFun"
    >
      <img
        src="https://i.imgur.com/ylqbx7Y.png"
        class="w-14 h-14"
        alt="identiFun logo"
      />
      <span class="text-xl font-semibold dark:text-white">
        identiFun
      </span>
    </div>
  );
}

export default NavbarLogo;
