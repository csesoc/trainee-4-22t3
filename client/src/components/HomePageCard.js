import HomePageCategory from "./HomePageCategory";

function HomePageCard({ userData }) {
  return (
    <div class="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg bg-blue-400/40">
      {/* can add profile pic here */}
      <div class="px-6 py-4">
        <h1 class="mb-3 text-3xl font-semibold tracking-tight text-center">{userData.user.username}</h1>
        {Object.keys(userData.items).map((category) => (
          <HomePageCategory userData={userData} category={category} />
        ))}
      </div>
    </div>
  );
}

export default HomePageCard;