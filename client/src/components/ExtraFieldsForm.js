import { useState } from 'react';

export default function ExtraFieldsForm({ customFields, setCustomFields }) {
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');
  const handleClick = (event) => {
    event.preventDefault();
    setCustomFields({ ...customFields, [tag]: content });
    console.log(customFields);
    setTag('');
    setContent('');
  };
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail1"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Tag
          </label>
          <input
            type="text"
            onChange={(e) => setTag(e.target.value)}
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-small
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Favourite Character"
          ></input>
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputPassword1"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Content
          </label>
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            className="form-control block
            w-full
            px-3
            py-1.5
            text-small
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Eren Yeager"
          ></input>
        </div>

        <button
          type="submit"
          onClick={handleClick}
          className="
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
        >
          Add Tag
        </button>
      </form>
    </div>
  );
}
