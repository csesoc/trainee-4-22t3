import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import defaultImg from '../images/default.jpg';

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
    <section className="h-screen">
      <Navbar />

      <div className="grid lg:grid-cols-3 min-h-[75%] align-top my-12">
        {identiFunners.map((userData) => (
          <div className="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg border-2 bg-cyan-300/20">
            {/* can add profile pic here */}
            <div className="px-6 py-4">
              <h1 className="mb-3 text-3xl font-semibold tracking-tight text-gray-800 text-center">
                {userData.user.username}
              </h1>
              {Object.keys(userData.items).map((category) => (
                <div className="flex flex-col bg-white/80 m-auto p-auto my-4 rounded-md">
                  <h2 className="flex py-4 px-2 mx-5 font-bold text-2xl text-gray-800">
                    {category}
                  </h2>
                  <div className="flex overflow-x-scroll pb-2 hide-scroll-bar">
                    <div className="flex flex-nowrap  ml-10 justify-start">
                      {userData.items[category].map((item) => (
                        <div className="inline-flex">
                          <div className="w-64 h-100 max-w-xs overflow-hidden rounded-lg bg-white">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              onError={(e) => {
                                e.target.src = defaultImg;
                              }}
                              className="flex-none md:w-2/3 rounded-lg h-64 object-cover shadow-sm transition ease-in-out hover:shadow-xl duration-200"
                            />
                            <p className="font-semibold">{item.name}</p>
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
