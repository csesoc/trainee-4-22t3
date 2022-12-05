import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomepageCard from '../components/HomepageCard';
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

                        {/* <div class="inline-block px-3">
                          <div
                            class="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                          ></div>
                        </div> */}

                        
                      </div>
                    </div>
                  </div>












                  
              ))}


              


              {/* {Object.keys(userData.items).map((category) => (
                <div class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8 border-black border-2 rounded-md my-4">
                  <h5>{category}</h5>
                  {userData.items[category].map((item) => (
                    <div>
                      <img src={item.imageUrl} onError={e => {e.target.src=defaultImg}} class="flex-none md:w-2/3 mr-8 rounded-lg my-6 w-10 h-48 object-cover" />
                      <p class="font-semibold">Frozen</p>
                    </div>
                  ))}
                </div>
              ))} */}

            </div>


           






          </div>
        ))}
      </div>


      <Footer />
    </section>
  );
}

export default HomePage;

{/* <div class="flex flex-col bg-white m-auto p-auto">
  <h1 class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">Example</h1>
  <div class="flex overflow-x-scroll pb-10 hide-scroll-bar">
    <div class="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">


      <div class="inline-block px-3">
        <div
          class="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        ></div>
      </div>
      <div class="inline-block px-3">
        <div
          class="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        ></div>
      </div>

      
    </div>
  </div>
</div>
<style>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style> */}