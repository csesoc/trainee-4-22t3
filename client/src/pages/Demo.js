import { useState, useEffect } from 'react';
import axios from 'axios';

function Demo() {
  const [identiFunners, setIdentiFunners] = useState([]);
  // const [text, setText] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/demo')
      .then((response) => setIdentiFunners(response.data));
    console.log('hello world');
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http//localhost:8000/demo', {
  //     category: spgjerjg,
  //     categoryItem,
  //   });
  // };

  return (
    <>
      <ul>
        {identiFunners.map((item) => (
          <li>
            {item.category} - {item.categoryItem} : {item.rating}
          </li>
        ))}
      </ul>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
}

export default Demo;
