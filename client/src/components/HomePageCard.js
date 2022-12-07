import { useNavigate } from 'react-router-dom';
import HomePageCategory from './HomePageCategory';

function HomePageCard({ userData }) {
  const navigate = useNavigate();
  // w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700
  return (
    <div className="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg bg-gray-800 border border-gray-700 ">
      <div className="px-6 py-4">
        <button
          onClick={() => navigate('/profile/' + userData.user.username)}
          title={userData.user.username + "'s profile"}
        >
          <h2 className="text-3xl font-semibold text-center text-white hover:text-slate-400">
            {userData.user.username}
          </h2>
        </button>
        {Object.keys(userData.items).map((category) => (
          <HomePageCategory userData={userData} category={category} />
        ))}
      </div>
    </div>
  );
}

export default HomePageCard;
