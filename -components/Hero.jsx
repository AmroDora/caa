import Image from 'next/image';
import carImage from '../-components/images/HomeCar.png';
import Link from 'next/link';

function HomePage ()  {
  return (
    <div className="w-full">

    
    <div className=" w-full min-h-screen flex flex-col">
      <header className="w-full flex-grow bg-gradient-to-b from-blue-900 via-gray-900 to-gray-300 py-20 ">
        <div className=" flex flex-wrap justify-center">
          <div className=" p-5">
            <section className=" mb-10 p-5 rounded shadow-lg text-white bg-gray-800">
              <h1 className="text-5xl mb-4">CAR RENTAL</h1>
              <p className="mb-8 text-xl">Welcome to our car rental service. We provide a wide range of vehicles for all your transportation needs.</p>
              <div className="text-center mb-5">
                <Link href="/cat" className="inline-block px-8 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">Make a Reservation</Link>
              </div>
            </section>

            <section className=" mt-32 p-5 rounded shadow-lg text-white bg-gray-800">
              <div>
                <h3 className="text-2xl mb-4 ">About Us</h3>
                <p className="text-lg">We are a leading car rental company dedicated to providing excellent service and high-quality vehicles.</p>
              </div>
            </section>
            
           
          </div>
          
          <div className=" ml-64 w-full md:w-1/3 flex justify-center items-center">
            <Image src={carImage} alt="Car" className="rounded-lg" width={800} height={550} />
          </div>
          
        </div>
        <section className=" mb-60- w-1/2  ml-9 p-5 rounded shadow-lg text-white bg-gray-800">
              <div>
                <h3 className="text-2xl mb-4">What We Offer</h3>
                <p className="text-lg">We offer a comprehensive car rental platform designed to provide seamless access to a diverse range of vehicles, ensuring convenience and flexibility for all your transportation needs.</p>
              </div>
            </section>
      </header>

      
    </div>
    </div>
  );
};

export default HomePage;
