import { FaWindowClose, FaStar } from 'react-icons/fa';
import defaultImg from '../images/default.jpg';
import axios from 'axios';
function ListItem({ token, item, setSuccess }) {
  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:5000/items/delete/` + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(setSuccess(true));
  };
  return (
    <li className="btn-fav py-4 bg-red-100" title={item.name}>
      <div className="flex align-end bg-blue-100">
        <button onClick={() => deleteItem(item.itemId.toString())}>
          <FaWindowClose />
        </button>
      </div>
      <a href={item.imageRef} className="link bg-center">
        {/* <div className="relative w-[200px] pb-20"> */}
        <img
          src={item.imageUrl}
          onError={(e) => {
            e.target.src = defaultImg;
          }}
          alt={item.name}
          className="h-48 max-w-full"
        />
        <div className="px-4 py-2 bg-gray-800 opacity-70 shadow-sm transition ease-in-out hover:shadow-xl duration-200">
          <h3 className="text-xl text-white font-bold">{item.name}</h3>
          <p className="mt-2 text-sm text-gray-300">{item.comment}</p>
          {/* </div> */}
        </div>
      </a>
      <div className="flex justify-center pt-4 px-4">
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
      <div className="m-2 bg-slate-100 rounded shadow-lg pt-4">
        {Object.keys(item.extraFields).map((field) => (
          <div className="text-base">
            {field}: {item.extraFields[field]}
          </div>
        ))}
      </div>
    </li>
  );
}

export default ListItem;
