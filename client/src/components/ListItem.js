import { FaWindowClose, FaStar } from 'react-icons/fa';
function ListItem({ item }) {
  return (
    <li className="btn-fav max-h-full py-4" title={item.name}>
      <div className="justify-center">
        <FaWindowClose></FaWindowClose>
      </div>
      <a href={item.imageRef} className="link bg-center">
        <div className="relative w-[200px] pb-20">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover max-h-25 max-w-full"
          />
          <div className="absolute left-0 right-0 px-4 py-2 bg-gray-800 opacity-70 shadow-sm transition ease-in-out hover:shadow-xl duration-200">
            <h3 className="text-xl text-white font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-gray-300">{item.comment}</p>
          </div>
        </div>
        <div className="flex justify-center relative w-[200px] pt-4">
          {[...Array(10)].map((_, index) => (
            <button
              key={index}
              className={
                index < item.rating ? 'text-yellow-400' : 'text-gray-300'
              }
            >
              <FaStar />
            </button>
          ))}
        </div>
        <div className="m-2 bg-slate-100 rounded shadow-lg h-auto relative w-[200px] pt-4">
          <div className="text-base">Released: {item.released}</div>
          <div className="text-base">Made by: {item.createdBy}</div>
          {Object.keys(item.extraFields).map((field) => (
            <div className="text-base">
              {field}: {item.extraFields[field]}
            </div>
          ))}
        </div>
      </a>
    </li>
  );
}

export default ListItem;
