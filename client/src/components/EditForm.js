import { useState } from 'react';
import ItemForm from './ItemForm';
import { useParams } from 'react-router-dom';
import { FaPlus, FaEdit } from 'react-icons/fa';

export default function EditForm({ item, setSuccess, user }) {
  const { username } = useParams();
  const [change, setChange] = useState(false);
  return (
    <>
      {username === user.username && (
        <div className="inset-x-0 bottom-0 flex justify-center">
          <button
            type="submit"
            onClick={() => setChange(true)}
            className={`
              bottom-0
              px-4
              gap-x-2
              flex items-center
              py-2.5
              bg-sky-500
              ${item ? 'w-28' : 'w-96'}
              text-white
              ${item ? 'text-left' : 'text-center'}
              font-medium                 
              text-xs
              rounded
              shadow-md
              hover:bg-sky-700 hover:shadow-lg
              active:bg-sky-900 active:shadow-lg
              transition
              duration-150
              ease-in-out`}
          >
            {!item ? <FaPlus /> : <FaEdit />}
            {item ? 'Edit Item' : 'Add Item'}
          </button>
        </div>
      )}
      {change && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-slate-900">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {item ? 'Edit Item' : 'Add Item'}
                  </h3>
                  <button
                    className="p-1 m-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setChange(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <ItemForm
                    token={user.token}
                    setSuccess={setSuccess}
                    item={item}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setChange(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
