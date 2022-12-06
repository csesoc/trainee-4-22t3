import defaultImg from '../images/default.jpg';

function HomePageItem({ item }) {
  return (
    <div class="inline-flex">
      <div class="w-64 h-100 max-w-xs overflow-hidden rounded-lg bg-white">
        <img src={item.imageUrl} onError={e => {e.target.src=defaultImg}} class="flex-none md:w-2/3 rounded-lg h-64 object-cover shadow-sm transition ease-in-out hover:shadow-xl duration-200" />
        <p class="font-semibold">{item.name}</p>
        <p class="font-semibold">{item.rating}/10</p>
      </div>
    </div>
  );
}

export default HomePageItem;