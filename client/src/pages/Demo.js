import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWindowClose, FaStar } from 'react-icons/fa';

/**
 * A demo component to showcase connecting with a backend server
 */
function Demo() {
  const [identiFunners, setIdentiFunners] = useState([]);
  const [category, setCategory] = useState('');
  const [categoryItem, setCategoryItem] = useState('');
  const [rating, setRating] = useState(1);
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
      .then((response) => setIdentiFunners(response.data));
    // .then(setSuccess(false));
    return () => setSuccess(false);
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
        setRating(1);
      })
      .catch((error) => handleError(error.response.data.error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/demo/` + id).then(setSuccess(true));
  };

  return (
    <div className="px-8 bg-slate-200 text-center min-h-screen">
      <h1 className="text-4xl font-bold">IdentiFunners</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {identiFunners.map((item) => (
          <div
            className="flex flex-col m-4 bg-slate-100 rounded shadow-lg h-48"
            key={item.id}
          >
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
        ))}
      </div>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-4 shadow-xl rounded bg-slate-300"
        >
          <h1 className="text-lg font-bold">Add New Item</h1>
          <div className="mb-4">
            <label className="block">Category</label>
            <input
              type="text"
              value={category}
              size={50}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block">Category Item</label>
            <input
              type="text"
              value={categoryItem}
              size={50}
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
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="shadow border rounded"
            />
          </div>
          <div>
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 rounded"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Demo;
