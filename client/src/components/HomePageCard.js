import HomePageCategory from './HomePageCategory';

function HomePageCard({ userData }) {
  return (
    <div class="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg bg-blue-500/10">
      <div class="px-6 py-4">
        <div>
          <a 
            href={'http://localhost:3000/profile/' + userData.user.username}
            title={userData.user.username + "'s profile"}
            class="flex hover:cursor-pointer"
          >
            <h2 class="text-3xl font-medium text-center text-white hover:underline">
              {userData.user.username}
            </h2>
            <img 
              class="w-10 h-10 rounded-full mx-4 object-cover" 
              src={userData.user.profileImgUrl ? userData.user.profileImgUrl : 'https://i.stack.imgur.com/l60Hf.png'} alt="Error" 
              onError={(e) => {
                e.target.src = 'https://i.stack.imgur.com/l60Hf.png';
              }}
            />
          </a>
        </div>
        {Object.keys(userData.items).map((category) => (
          <HomePageCategory userData={userData} category={category} />
        ))}
      </div>
    </div>
  );
}

export default HomePageCard;
