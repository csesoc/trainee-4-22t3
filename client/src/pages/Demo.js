import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A demo component to showcase connecting with a backend server
 */
function Demo() {
  const [identiFunners, setIdentiFunners] = useState([]);
  const [category, setCategory] = useState('');
  const [categoryItem, setCategoryItem] = useState('');
  const [rating, setRating] = useState(0);
  // This success state is passed as a dependency for the useEffect
  // Such that whenever a successful POST request to the server is made,
  // useEffect fetches the data from the server so all is updated
  const [success, setSuccess] = useState(false);

  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {
    axios
      .get('http://localhost:8000/demo')
      .then((response) => setIdentiFunners(response.data))
      .then(setSuccess(false));
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/demo', {
        category,
        categoryItem,
        rating,
      })
      // Set success state to re-fetch updated data
      .then(setSuccess(true));
  };

  return (
    <div>
      <h1 className="text-blue-700 text-2xl font-bold">IdentiFunners</h1>;
      <ul>
        {identiFunners.map((item) => (
          <li>
            {item.category} - {item.categoryItem} : {item.rating}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Category Item</label>
          <input
            type="text"
            value={categoryItem}
            onChange={(e) => setCategoryItem(e.target.value)}
            className="shadow border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Rating</label>
          <input
            type="number"
            min={0}
            label="Rating"
            onChange={(e) => setRating(e.target.value)}
            className="shadow border rounded"
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Demo;
