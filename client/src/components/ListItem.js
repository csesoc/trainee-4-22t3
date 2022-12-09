import { FaWindowClose, FaStar } from 'react-icons/fa';
import defaultImg from '../images/default.jpg';
import EditForm from './EditForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function ListItem({ user, token, item, setSuccess }) {
  const { username } = useParams();
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
    <>
      <div className="relative w-48">
        {username === user.username && (
          <div className="flex align-end absolute left-0 top-0">
            <button onClick={() => deleteItem(item.itemId.toString())}>
              <FaWindowClose />
            </button>
          </div>
        )}
        <a href={item.imageRef} className="link bg-center">
          <img
            src={item.imageUrl}
            onError={(e) => {
              e.target.src = defaultImg;
            }}
            alt={item.name}
            className="object-cover h-32 w-52"
          />
          <div className="px-4 py-2 bg-gray-800 opacity-70 overflow-hidden">
            <h3 className="text-xl text-white font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-gray-300">{item.comment}</p>
          </div>
        </a>
        <div className="flex justify-center p-4">
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
        <div className="m-2 bg-sky-900 text-gray-300 rounded shadow-lg">
          {Object.keys(item.extraFields).map((field) => (
            <div className="px-2 text-base">
              {field}: {item.extraFields[field]}
            </div>
          ))}
        </div>
        <EditForm item={item} setSuccess={setSuccess} user={user} />
      </div>
    </>
  );
}

export default ListItem;
