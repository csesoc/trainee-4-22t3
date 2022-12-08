import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
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
    <>
      <Navbar user={user} setUser={setUser} />
      <section className="h-screen">
        <div className="grid grid-cols-3 gap-0">
          {Object.keys(identiFunners).map((category) => (
            <CategoryCard
              category={category}
              items={identiFunners[category]}
              setSuccess={setSuccess}
              token={user.token}
            />
          ))}
        </div>
        <div className="w-full">
          {username === user.username && (
            <ItemForm token={user.token} setSuccess={setSuccess} />
          )}
        </div>
        <Footer />
      </section>
    </>
  );
}

export default ProfilePage;
