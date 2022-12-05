import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <section className="h-screen">
      <Navbar />

      <div class="grid lg:grid-cols-3 h-screen place-items-center">


        {/* {Object.keys(identiFunners).map((user) => (
          <TestItem
            category={category}
            items={identiFunners[category]}
            setSuccess={setSuccess}
          />
        ))} */}


        <div class="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img class="w-full h-48"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="product" />
            <div class="px-6 py-4">
                <h4 class="mb-3 text-xl font-semibold tracking-tight text-gray-800">This is the title</h4>
                <p class="leading-normal text-gray-700">Lorem ipsum dolor, sit amet cons ectetur adipis icing
                    elit.
                    Praesen tium, quibusdam facere quo laborum maiores sequi nam tenetur laud.</p>
            </div>
        </div>

        <div class="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img class="w-full h-48"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="product" />
            <div class="px-6 py-4">
                <h4 class="mb-3 text-xl font-semibold tracking-tight text-gray-800">This is the title</h4>
                <p class="leading-normal text-gray-700">Lorem ipsum dolor, sit amet cons ectetur adipis icing
                    elit.
                    Praesen tium, quibusdam facere quo laborum maiores sequi nam tenetur laud.</p>
            </div>
        </div>

        <div class="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img class="w-full h-48"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="product" />
            <div class="px-6 py-4">
                <h4 class="mb-3 text-xl font-semibold tracking-tight text-gray-800">This is the title</h4>
                <p class="leading-normal text-gray-700">Lorem ipsum dolor, sit amet cons ectetur adipis icing
                    elit.
                    Praesen tium, quibusdam facere quo laborum maiores sequi nam tenetur laud.</p>
            </div>
        </div>

    </div>














      <Footer />
    </section>
  );
}

export default HomePage;
