import React from 'react'
import Anouncement from '../Components/Anouncement';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Products from '../Components/Products';
import Slider from '../Components/Slider';


const Home = () => {
  return (
    <div>
      <Anouncement />
      <Navbar />
      <Slider />
      <Products />
      <Footer />
    </div>
  )
}

export default Home