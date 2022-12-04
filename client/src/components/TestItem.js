import { FaWindowClose, FaStar } from 'react-icons/fa';
import ListItem from '../components/ListItem';
function TestItem({ category, items, setSuccess }) {
  return (
    <div className="flex flex-col m-4 bg-slate-100 rounded shadow-lg h-48 h-auto">
      <div className="flex justify-end align-start">
        <button>
          <FaWindowClose />
        </button>
      </div>
      <div className="overflow-auto">
        <h1 className="text-3xl font-bold text-center">{category}</h1>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ListItem item={item} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TestItem;
