import { FaWindowClose, FaStar } from 'react-icons/fa';
function ListItem({ item }) {
  return (
    <li className="btn-fav" title={item.name}>
      <a href={item.imageRef} className="link bg-center">
        <div className="relative w-[200px]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover h-40 w-40 content-center"
          />
          <div className="absolute left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 className="text-xl text-white font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-gray-300">{item.comment}</p>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="flex justify-center relative w-[200px]">
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
        <br></br>
        <div className="m-2 bg-slate-100 rounded shadow-lg h-auto relative w-[200px]">
          <div className="text-base text-center">Released: {item.released}</div>
          <div className="text-base text-center">Made by: {item.createdBy}</div>
          {Object.keys(item.extraFields).map((field) => (
            <div className="text-base text-center">
              {field}: {item.extraFields[field]}
            </div>
          ))}
        </div>
      </a>
    </li>
  );
}

export default ListItem;
