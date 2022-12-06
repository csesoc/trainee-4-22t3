import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePageCard from '../components/HomePageCard';

function HomePage() {
  const [homepageData, setHomepageData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/items/homepage/get')
      .then((response) => setHomepageData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <section>
      <Navbar />
      <h1 class="my-4 mx-5 font-bold text-4xl">Welcome</h1>
      <div class="grid lg:grid-cols-3 min-h-[75%] align-top my-12">
        {homepageData.map((userData) => (
          <HomePageCard userData={userData} />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default HomePage;
