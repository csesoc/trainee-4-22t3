import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditForm from '../components/EditForm';
import CategoryCard from '../components/CategoryCard';
function ProfilePage({ user, setUser }) {
  const [identiFunners, setIdentiFunners] = useState({});
  const [success, setSuccess] = useState(false);
  const { username } = useParams();
  // Makes a request to the server when component mounts + when success state is set
  useEffect(() => {
    axios
      .get('http://localhost:5000/items/get', {
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
    <section class="flex flex-col h-screen justify-between">
      <Navbar user={user} setUser={setUser} />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-0">
        {Object.keys(identiFunners).map((category) => (
          <CategoryCard
            category={category}
            items={identiFunners[category]}
            setSuccess={setSuccess}
            token={user ? user.token : null}
            user={user}
          />
        ))}
      </div>
      <EditForm item={null} setSuccess={setSuccess} user={user} />
      <Footer />
    </section>
  );
}

export default ProfilePage;
