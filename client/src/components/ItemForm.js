import { useState } from 'react';
import axios from 'axios';
import ExtraFieldsForm from '../components/ExtraFieldsForm';

export default function ItemForm({ token, setSuccess, item }) {
  const [category, setCategory] = useState(item ? item.category : '');
  const [itemName, setItemName] = useState(item ? item.name : '');
  const [comment, setComment] = useState(item ? item.comment : '');
  const [imageRef, setImageRef] = useState(item ? item.imageRef : '');
  const [imageUrl, setImageUrl] = useState(item ? item.imageUrl : '');
  const [extraFields, setExtraFields] = useState(false);
  const [customFields, setCustomFields] = useState({});
  const [rating, setRating] = useState(item ? item.rating : 5);
  const handleSubmit = (e) => {
    const request = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const fields = {
      category,
      name: itemName,
      comment,
      imageRef,
      imageUrl,
      rating,
      extraFields: customFields,
    };
    e.preventDefault();
    axios[!item ? 'post' : 'put'](
      !item
        ? process.env.REACT_APP_API_URL + '/items/add'
        : process.env.REACT_APP_API_URL + '/items/update/' + item.itemId,
      fields,
      request
    )
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
      .catch((error) => alert(error));
  };

  return (
    <>
      <div className="mt-10 sm:mt-0 flex justify-center align-bottom">
        <div className="md:grid md:grid-cols-2 md:gap-x-8">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md border-2 border-slate-500">
              <div className="bg-white px-4 py-2 sm:p-6 bg-slate-900">
                <label>
                  <span className="text-gray-400 text-sm font-medium">
                    Item Name
                  </span>
                  <input
                    type="text"
                    name="itemName"
                    placeholder={!item ? 'Endgame' : item.name}
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
                  ></input>
                  {!item && (
                    <span className="text-rose-600 dark:text-rose-500 text-sm">
                      This field is required.
                    </span>
                  )}
                </label>
                {!item && (
                  <div className="py-2">
                    <span className="text-gray-400 text-sm font-medium">
                      Category
                    </span>
                    <input
                      type="text"
                      name="category"
                      value={category}
                      placeholder={!item ? 'Movie' : item.category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
                    />
                    {!item && (
                      <span className="text-rose-600 dark:text-rose-500 text-sm">
                        This field is required.
                      </span>
                    )}
                  </div>
                )}
                <div className="py-2">
                  <span className="text-gray-400 text-sm font-medium">
                    Comment
                  </span>
                  <input
                    type="text"
                    name="comment"
                    value={comment}
                    placeholder={!item ? 'I am inevitable' : item.comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
                  />
                </div>
                <div className="py-2">
                  <span className="text-gray-400 text-sm font-medium py-2">
                    Image URL
                  </span>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
                      placeholder={
                        !item ? 'http://imgur.com/avengers.jpg' : item.imageUrl
                      }
                    />
                  </div>
                </div>
                <div className="py-2">
                  <span className="text-gray-400 text-sm font-medium">
                    Image Ref
                  </span>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="imageRef"
                      value={imageRef}
                      onChange={(e) => setImageRef(e.target.value)}
                      className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
                      placeholder={
                        !item ? 'http://imdb.com/avengers' : item.imageRef
                      }
                    />
                  </div>
                </div>

                <div className="py-2">
                  <span className="text-gray-400 text-sm font-medium">
                    Rating
                  </span>
                  <input
                    type="number"
                    name="rating"
                    min={1}
                    max={10}
                    value={rating}
                    label="Rating"
                    placeholder={!item ? '5' : item.rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
                  />
                  {!item && (
                    <span className="text-rose-600 dark:text-rose-500 text-sm">
                      This field is required.
                    </span>
                  )}
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          name="extraFields"
                          value={2}
                          onChange={(e) => setExtraFields(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="ml-3 text-xs">
                          <label className="font-medium text-gray-400">
                            Extra Fields
                            {!item && (
                              <p className="text-gray-300">
                                Have your own custom tags on an item!
                              </p>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 bg-slate-700">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="
                  px-4
                  bottom-0
                  py-2.5
                  bg-sky-500
                  text-white
                  font-medium
                  text-xs
                  rounded
                  shadow-md
                  hover:bg-sky-700 hover:shadow-lg
                  active:bg-sky-900 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out"
                >
                  {!item ? 'Add Item' : 'Edit Item'}
                </button>
              </div>
            </div>
          </form>
          <div className="">
            {extraFields && (
              <ExtraFieldsForm
                setCustomFields={setCustomFields}
                customFields={customFields}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
