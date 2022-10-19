import { useState } from 'react';
import axios from 'axios';

function DemoForm({ setSuccess }) {
  // States to store the form data
  const [category, setCategory] = useState('');
  const [categoryItem, setCategoryItem] = useState('');
  const [rating, setRating] = useState(1);
  // Any error message to be displayed
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault() to prevent submitting to a website and reloading
    e.preventDefault();
    // Make a POST request to create a new item with form fields
    axios
      .post('http://localhost:8000/demo', {
        category,
        categoryItem,
        rating,
      })
      .then(() => {
        // Set success state to re-fetch updated data
        setSuccess(true);
        setCategory('');
        setCategoryItem('');
        setRating(1);
      })
      .catch((error) => handleError(error.response.data.error));
  };

  // Display error message for 3 seconds
  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
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
          {/* Display error message if it exists  */}
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
  );
}

export default DemoForm;
