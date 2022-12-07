import HomePageItem from './HomePageItem';

function HomePageCategory({ userData, category }) {
  return (
    <div className="flex flex-col bg-white m-auto p-auto my-4 rounded-md">
      <h2 className="flex mx-8 py-4 px-2 mx-5 font-semibold text-2xl">
        {category}
      </h2>
      <div className="flex overflow-x-scroll pb-2 scrollbar-hide">
        <div className="flex flex-nowrap ml-10 justify-start">
          {userData.items[category].map((item) => (
            <HomePageItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePageCategory;
