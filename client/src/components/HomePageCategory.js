import { useState } from 'react';
import HomePageItem from './HomePageItem';

function HomePageCategory({ userData, category }) {
  const [hover, setHover] = useState(false);

  return (
    <div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} class="flex flex-col bg-gray-900 m-auto p-auto my-4 rounded-md border border-gray-700 scrollbar-hide">
      <h2 class="flex mx-8 py-4 px-2 mx-5 font-semibold text-white text-2xl">
        {category}
      </h2>
      <div class={`flex overflow-x-scroll pb-2 scrollbar ${hover === false ? "scrollbar-thumb-hide" : ""}`}>
        <div class="flex flex-nowrap ml-10 justify-start">
          {userData.items[category].map((item) => (
            <HomePageItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePageCategory;
