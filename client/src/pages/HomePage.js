import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import defaultImg from '../images/default.jpg';

function HomePage() {
  const [identiFunners, setIdentiFunners] = useState([]);

  const handleSubmit = () => {};

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
          <div class="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg border-2 bg-cyan-300/20">
            {/* can add profile pic here */}
            <div class="px-6 py-4">
              <h1 class="mb-3 text-3xl font-semibold tracking-tight text-gray-800 text-center">{userData.user.username}</h1>
              {Object.keys(userData.items).map((category) => (
                  <div class="flex flex-col bg-white/80 m-auto p-auto my-4 rounded-md">
                    <h2 class="flex py-4 px-2 mx-5 font-bold text-2xl text-gray-800">{category}</h2>
                    <div class="flex overflow-x-scroll pb-2 hide-scroll-bar">
                      <div class="flex flex-nowrap  ml-10 justify-start">
                        {userData.items[category].map((item) => (
                          <div class="inline-flex">
                            <div class="w-64 h-100 max-w-xs overflow-hidden rounded-lg bg-white">
                              <img src={item.imageUrl} onError={e => {e.target.src=defaultImg}} class="flex-none md:w-2/3 rounded-lg h-64 object-cover shadow-sm transition ease-in-out hover:shadow-xl duration-200" />
                              <p class="font-semibold">{item.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </section>
  );
}

export default HomePage;
    