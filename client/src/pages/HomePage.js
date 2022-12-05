import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePageCard from '../components/HomePageCard';

function HomePage() {
  const [identiFunners, setIdentiFunners] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/items/homepage/get')
      .then((response) => setIdentiFunners(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <section class="h-screen">
      <Navbar />
      <div class="grid lg:grid-cols-3 min-h-[75%] align-top my-12">
        {identiFunners.map((userData) => (
          <HomePageCard userData={userData} />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default HomePage;
