import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import Bookings from "./components/Bookings";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
//import IronedShirtCarousel from "./components/IronedShirtCarousel";

function App() {
  return (
    <div className="font-sans scroll-smooth">
      <Navbar />
      <main>
        <section id="home"><Home /></section>
        <section id="services"><Services /></section>
        <section id="bookings"><Bookings /></section>
        
        <section id="about"><About /></section>
{/*         
        <section id="ironed-shirts"><IronedShirtCarousel /></section> */}
        <section id="testimonials"><Testimonials /></section>
        <section id="contact"><Footer /></section>
      </main>
    </div>
  );
}

export default App;
