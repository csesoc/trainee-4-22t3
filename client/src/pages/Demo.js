import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A demo component to showcase connecting with a backend server
 */
function Demo() {
  const [identiFunners, setIdentiFunners] = useState([]);
  const [category, setCategory] = useState('');
  const [categoryItem, setCategoryItem] = useState('');
  const [rating, setRating] = useState(null);
  // This success state is passed as a dependency for the useEffect
  // Such that whenever a successful POST request to the server is made,
  // useEffect fetches the data from the server so all is updated
  const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {
    axios
      .get('http://localhost:8000/demo')
      .then((response) => setIdentiFunners(response.data))
      .then(setSuccess(false));
  }, [success]);

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/demo', {
        category,
        categoryItem,
        rating,
      })
      // Set success state to re-fetch updated data
      .then(() => {
        setSuccess(true);
        setCategory('');
        setCategoryItem('');
        setRating(null);
      })
      .catch((error) => handleError(error.response.data.error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/demo/` + id).then(setSuccess(true));
  };

  return (
    <div className="flex flex-col items-center mx-8">
      <h1 className="text-blue-700 text-4xl font-bold">IdentiFunners</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full gap-8">
        {identiFunners.map((item) => (
          <div className="p-8 rounded shadow-lg h-72" key={item.id}>
            <div className="flex justify-end align-start">
              <button onClick={() => handleDelete(item.id)}>X</button>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{item.category}</h1>
              <h2 className="text-xl">{item.categoryItem}</h2>
              <h3 className="text-base">{item.rating}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-xs shadow-xl rounded">
        <form onSubmit={handleSubmit} className="py-4">
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
              min={1}
              max={10}
              value={rating}
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
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 rounded"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Demo;
