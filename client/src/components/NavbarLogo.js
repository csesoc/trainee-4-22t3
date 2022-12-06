import { useNavigate } from 'react-router-dom';

function NavbarLogo() {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => {navigate('/')}} class="flex items-center cursor-pointer" title="identiFun">
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
  );
}

export default NavbarLogo;