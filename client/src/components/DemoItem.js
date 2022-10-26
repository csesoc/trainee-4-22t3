import axios from 'axios';
import { FaWindowClose, FaStar } from 'react-icons/fa';

function DemoItem({ item, setSuccess }) {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/demo/` + id).then(setSuccess(true));
  };
  return (
    <div className="flex flex-col m-4 bg-slate-100 rounded shadow-lg h-48">
      <div className="flex justify-end align-start">
        <button onClick={() => handleDelete(item.id)}>
          <FaWindowClose />
        </button>
      </div>
      <div className="overflow-hidden">
        <h1 className="text-3xl font-bold">{item.category}</h1>
        <h2 className="text-xl">{item.categoryItem}</h2>
        <div className="flex justify-center">
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
      </div>
    </div>
  );
}

export default DemoItem;
