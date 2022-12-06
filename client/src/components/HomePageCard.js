import { useNavigate } from 'react-router-dom';
import HomePageCategory from "./HomePageCategory";

function HomePageCard({ userData }) {
  const navigate = useNavigate();

  return (
    <div class="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg bg-blue-400/40">
      <div class="px-6 py-4">
        <button onClick={() => navigate('/' + userData.user.username)} title={userData.user.username + '\'s profile'}>
          <h2 class="text-3xl font-semibold text-center hover:text-slate-500">{userData.user.username}</h2>
        </button>
        {Object.keys(userData.items).map((category) => (
          <HomePageCategory userData={userData} category={category} />
        ))}
      </div>
    </div>
  );
}

export default HomePageCard;