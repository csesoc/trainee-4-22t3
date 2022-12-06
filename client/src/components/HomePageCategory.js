import HomePageItem from "./HomePageItem";

function HomePageCategory({ userData, category }) {
  return (
    <div class="flex flex-col bg-white/80 m-auto p-auto my-4 rounded-md">
      <h2 class="flex py-4 px-2 mx-5 font-bold text-2xl text-gray-800">{category}</h2>
      <div class="flex overflow-x-scroll pb-2 hide-scroll-bar">
        <div class="flex flex-nowrap  ml-10 justify-start">
          {userData.items[category].map((item) => (
            <HomePageItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePageCategory;