import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomepageCard from '../components/HomepageCard';

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
          <div class="max-w-md w-full mx-4 mb-2 rounded-lg shadow-lg">
            <img class="w-full h-52"
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
              alt="product" />
            <div class="px-6 py-4">
              <h4 class="mb-3 text-xl font-semibold tracking-tight text-gray-800">{userData.user.username}</h4>
              {Object.keys(userData.items).map((category) => (
                <div class="container mx-auto px-4 box-border h-32 w-full p-4 border-2 rounded-md my-4">
                  <h5 class="text-center">{category}</h5>
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
