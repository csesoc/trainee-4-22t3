import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePageCard from '../components/HomePageCard';
import refreshIcon from '../images/refresh.jpg';

function HomePage({ user, setUser }) {
  const [homepageData, setHomepageData] = useState([]);

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + '/items/homepage/get')
      .then((response) => setHomepageData(response.data))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <Navbar user={user} setUser={setUser} />
      <div className="flex bg-gray-900">
        <h1 className="my-4 mx-5 font-bold text-4xl text-white">
          Check out these profiles!
        </h1>
        <button onClick={fetchData} className="my-5 mx-4" title="Refresh">
          <img
            src={refreshIcon}
            className="object-scale-down h-10 w-10 hover:opacity-[.6]"
            alt="RefreshIcon"
          />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 min-h-[75%] align-top bg-gray-900">
        {homepageData.map((userData) => (
          <HomePageCard userData={userData} />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default HomePage;
