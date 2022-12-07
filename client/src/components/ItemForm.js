import { useState } from 'react';
import axios from 'axios';
import ExtraFieldsForm from '../components/ExtraFieldsForm';

export default function ItemForm({ token, setSuccess }) {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [comment, setComment] = useState('');
  const [imageRef, setImageRef] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [extraFields, setExtraFields] = useState(false);
  const [customFields, setCustomFields] = useState({});
  const [rating, setRating] = useState(1);
  // Any error message to be displayed
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    const request = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      category,
      itemName,
      comment,
      imageRef,
      imageUrl,
      rating,
      extraFields: customFields,
    };
    console.log(request);
    e.preventDefault();
    axios
      .post('http://localhost:5000/items/add', request)
      .then(() => {
        setSuccess(true);
        setCategory('');
        setComment('');
        setItemName('');
        setImageRef('');
        setImageUrl('');
        setExtraFields(false);
        setCustomFields({});
        setRating(1);
      })
      .catch((error) => handleError(error.response.data.error));
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-5 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="col-span-6 sm:col-span-3 py-2">
                    <label className="block text-xs font-medium text-gray-700">
                      Item Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setItemName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 py-2">
                    <label className="block text-xs font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 py-2">
                    <label className="block text-xs font-medium text-gray-700">
                      Comment
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                    />
                  </div>

                  <label className="block text-xs font-medium text-gray-700">
                    Image URL
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm py-2">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-xs text-gray-500">
                      http://
                    </span>
                    <input
                      type="text"
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                      placeholder="www.example.com"
                    />
                  </div>
                  <label className="block text-xs font-medium text-gray-700">
                    Image Ref
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-xs text-gray-500">
                      http://
                    </span>
                    <input
                      type="text"
                      onChange={(e) => setImageRef(e.target.value)}
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                      placeholder="www.example.com"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 py-4">
                    <label className="block text-xs font-medium text-gray-700">
                      Rating
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={rating}
                      label="Rating"
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-s text-center"
                    />
                    <fieldset>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              type="checkbox"
                              value={2}
                              onChange={(e) => setExtraFields(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-xs">
                            <label className="font-medium text-gray-700">
                              Extra Fields
                            </label>
                            <p className="text-gray-500">
                              Have your own custom tags on an item!
                            </p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </form>
          </div>
          {(() => {
            if (extraFields) {
              return (
                <ExtraFieldsForm
                  setCustomFields={setCustomFields}
                  customFields={customFields}
                />
              );
            }
          })()}
        </div>
      </div>
    </>
  );
}
