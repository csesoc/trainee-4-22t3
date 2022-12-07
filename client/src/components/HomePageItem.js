import defaultImg from '../images/default.jpg';

function HomePageItem({ item }) {
  return (
    <div class="inline-flex">
      <div className="w-64 h-100 max-w-xs overflow-hidden rounded-lg bg-gray-900">
        <img
          src={item.imageUrl}
          alt="item"
          onError={(e) => {
            e.target.src = defaultImg;
          }}
          class="flex-none md:w-2/3 rounded-lg h-64 object-cover transition ease-in-out hover:shadow-xl duration-200"
        />
        <p class="text-white font-normal">{item.name}</p>
        <p class="text-white font-normal">{item.rating}/10</p>
      </div>
    </div>
  );
}

export default HomePageItem;
