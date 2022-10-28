import { useEffect, useState } from 'react';
import axios from 'axios';
function ProfilePage() {
  const [identiFunners, setIdentiFunners] = useState([]);
  const [success, setSuccess] = useState(false);

  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {
    axios
      .get(`http://localhost:8000/item/0`)
      .then((response) => setIdentiFunners(response.data));
    return () => setSuccess(false);
  }, [success]);
  console.log(identiFunners.categories);

  return (
    <div>
      {identiFunners.map((item) => (
        <div>
          {item.category}, {item.itemName}, {item.custom}
        </div>
      ))}
      ProfilePage
    </div>
  );
}

export default ProfilePage;
