import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer class="p-4 shadow md:px-6 md:py-8 bg-[#252526]">
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{' '}
        <span class="hover:underline" onClick={() => { navigate('/') }}>
          identiFun™
        </span>
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;