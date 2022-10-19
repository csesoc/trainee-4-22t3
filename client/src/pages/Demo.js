import { useState, useEffect } from 'react';
import axios from 'axios';
import DemoForm from '../components/DemoForm';
import DemoItem from '../components/DemoItem';

/**
 * A demo component to showcase connecting with a backend server
 */
function Demo() {
  // List of identiFunners: will be fetched from backend
  const [identiFunners, setIdentiFunners] = useState([]);
  // This success state is passed as a dependency for the useEffect
  // Such that whenever a successful POST request to the server is made,
  // useEffect fetches the data from the server so all is updated
  const [success, setSuccess] = useState(false);

  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {
    axios
      .get('http://localhost:8000/demo')
      .then((response) => setIdentiFunners(response.data));
    // .then(setSuccess(false));
    return () => setSuccess(false);
  }, [success]);

  return (
    <div className="px-8 bg-slate-200 text-center min-h-screen">
      <h1 className="text-4xl font-bold">IdentiFunners</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {identiFunners.map((item) => (
          <DemoItem key={item.id} item={item} setSuccess={setSuccess} />
        ))}
      </div>
      <DemoForm setSuccess={setSuccess} />
    </div>
  );
}

export default Demo;
