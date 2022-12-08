import { useState } from 'react';

export default function ExtraFieldsForm({ customFields, setCustomFields }) {
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');
  const handleClick = (event) => {
    event.preventDefault();
    setCustomFields({ ...customFields, [tag]: content });
    setTag('');
    setContent('');
  };
  return (
    <div className="block px-4 py-8 rounded-lg shadow-lg bg-white max-w-sm flex justify-center  border-2 border-slate-500 bg-slate-900">
      <form>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-400">
            Tag
          </label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
            placeholder="Favourite Character"
          ></input>
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputPassword1"
            className="form-label inline-block mb-2 text-gray-400"
          >
            Content
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="font-sans block text-sm leading-5 w-full py-2 px-4 border-2 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-blue-500 dark:focus:ring-blue-900 dark:focus:border-blue-600"
            placeholder="Eren Yeager"
          ></input>
        </div>

        <button
          type="submit"
          onClick={handleClick}
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
          Add Tag
        </button>
      </form>
    </div>
  );
}
