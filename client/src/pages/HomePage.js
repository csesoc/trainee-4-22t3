import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePageCard from '../components/HomePageCard';
import refreshIcon from '../images/refresh.jpg';

function HomePage() {
  const [homepageData, setHomepageData] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/items/homepage/get')
      .then((response) => setHomepageData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <section>
      <Navbar />
      <div class="flow-root">
        <h1 class="float-left my-4 mx-5 font-bold text-4xl">Check out these profiles!</h1>
        <button onClick={fetchData} class="float-right my-4 mx-8" title="Refresh"><img src={refreshIcon} class="object-scale-down h-12 w-12 hover:opacity-[.84]" /></button>
      </div>
      
      <div class="grid lg:grid-cols-3 min-h-[75%] align-top my-2">
        {homepageData.map((userData) => (
          <HomePageCard userData={userData} />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default HomePage;
