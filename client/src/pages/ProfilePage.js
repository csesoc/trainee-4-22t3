import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TestItem from '../components/CategoryCard';
import ItemForm from '../components/ItemForm';
function ProfilePage({ user, setUser }) {
  const [identiFunners, setIdentiFunners] = useState({});
  const [success, setSuccess] = useState(false);
  const { username } = useParams();
  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {
    axios
      .get('http://localhost:5000/items/get', {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
        params: {
          username,
        },
      })
      .then((response) => setIdentiFunners(response.data))
      .catch((err) => {
        console.log(err);
      });
    return () => setSuccess(false);
  }, [success]);
  return (
    <section className="h-screen">
      <Navbar user={user} setUser={setUser} />
      <div className="grid grid-cols-2 -space-x-20">
        {Object.keys(identiFunners).map((category) => (
          <TestItem
            category={category}
            items={identiFunners[category]}
            setSuccess={setSuccess}
            token={user.token}
          />
        ))}
      </div>
      <div>
        {(() => {
          if (username === user.username) {
            return <ItemForm token={user.token} setUser={setUser} />;
          }
        })()}
      </div>
      <Footer />
    </section>
  );
}

export default ProfilePage;
