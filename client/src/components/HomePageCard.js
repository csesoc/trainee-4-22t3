import { useNavigate } from 'react-router-dom';
import HomePageCategory from './HomePageCategory';

function HomePageCard({ userData }) {
  const navigate = useNavigate();
  // w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700
  return (
    <div class="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg bg-blue-500/10">
      <div class="px-6 py-4">
        <div>
          <button
            class="flex hover:cursor-pointer"
            onClick={() => {navigate('/profile/' + userData.user.username)}}
            title={userData.user.username + "'s profile"}
          >
            <h2 class="text-3xl font-medium text-center text-white hover:text-slate-400">
              {userData.user.username}
            </h2>
            <img 
              class="w-10 h-10 rounded-full mx-4 object-cover hover:opacity-[0.65]" 
              src={userData.user.profileImgUrl ? userData.user.profileImgUrl : 'https://i.stack.imgur.com/l60Hf.png'} alt="Error" 
              onError={(e) => {
                e.target.src = 'https://i.stack.imgur.com/l60Hf.png';
              }}
            />
          </button>
        </div>
        {Object.keys(userData.items).map((category) => (
          <HomePageCategory userData={userData} category={category} />
        ))}
      </div>
    </div>
  );
}

export default HomePageCard;
