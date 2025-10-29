// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Services from "./components/Services";
// import Bookings from "./components/Bookings";
// import About from "./components/About";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";
// import HowItWorks from "./components/HowitWorks";
// //import IronedShirtCarousel from "./components/IronedShirtCarousel";

// function App() {
//   return (
//     <div className="font-sans scroll-smooth">
//       <Navbar />
//       <main className="pt-10">
//         <section id="home" className="scroll-mt-16"><Home /></section>
//         <section id="howitworks" className="scroll-mt-16"><HowItWorks /></section>
//         <section id="services" className="scroll-mt-16"><Services /></section>
//         <section id="bookings" className="scroll-mt-16"><Bookings /></section>
//         <section id="about" className="scroll-mt-16"><About /></section>
//         <section id="testimonials" className="scroll-mt-16"><Testimonials /></section>
//         <section id="contact" className="scroll-mt-16"><Footer /></section>
//       </main>
//     </div>
//   );
// }

// export default App;

// ...existing code...
// import React, { useEffect, useRef } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Services from "./components/Services";
// import Bookings from "./components/Bookings";
// import About from "./components/About";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";
// import HowItWorks from "./components/HowitWorks";

// function App() {
//   const navRef = useRef(null);

//   useEffect(() => {
//     const setNavHeight = () => {
//       const h = navRef.current ? navRef.current.offsetHeight : 64;
//       document.documentElement.style.setProperty("--nav-height", `${h}px`);
//     };

//     setNavHeight();

//     // observe nav size changes
//     let ro;
//     if (typeof ResizeObserver !== "undefined") {
//       ro = new ResizeObserver(setNavHeight);
//       if (navRef.current) ro.observe(navRef.current);
//     }
//     window.addEventListener("resize", setNavHeight);

//     return () => {
//       window.removeEventListener("resize", setNavHeight);
//       if (ro) ro.disconnect();
//     };
//   }, []);

//   return (
//     <div className="font-sans scroll-smooth">
//       <Navbar ref={navRef} />
//       <main style={{ paddingTop: "var(--nav-height)" }}>
//         <section id="home" className="anchor"><Home /></section>
//         <section id="howitworks" className="anchor"><HowItWorks /></section>
//         <section id="services" className="anchor"><Services /></section>
//         <section id="bookings" className="anchor"><Bookings /></section>
//         <section id="about" className="anchor"><About /></section>
//         <section id="testimonials" className="anchor"><Testimonials /></section>
//         <section id="contact" className="anchor"><Footer /></section>
//       </main>
//     </div>
//   );
// }

// export default App;
// ...existing code...


// ...existing code...
// import React, { useEffect, useRef } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Services from "./components/Services";
// import Bookings from "./components/Bookings";
// import About from "./components/About";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";
// import HowItWorks from "./components/HowitWorks";

// function App() {
//   const navRef = useRef(null);

//   useEffect(() => {
//     const setNavHeight = () => {
//       const h = navRef.current ? navRef.current.offsetHeight : 64;
//       document.documentElement.style.setProperty("--nav-height", `${h}px`);
//     };

//     // run once after paint to catch final layout (fonts/images)
//     const id = requestAnimationFrame(() => {
//       setTimeout(setNavHeight, 0);
//     });

//     // observe nav size changes
//     let ro;
//     if (typeof ResizeObserver !== "undefined") {
//       ro = new ResizeObserver(setNavHeight);
//       if (navRef.current) ro.observe(navRef.current);
//     }
//     window.addEventListener("resize", setNavHeight);

//     return () => {
//       cancelAnimationFrame(id);
//       window.removeEventListener("resize", setNavHeight);
//       if (ro) ro.disconnect();
//     };
//   }, []);

//   return (
//     <div className="font-sans scroll-smooth">
//       <Navbar ref={navRef} />
//       {/* main padding comes from runtime CSS var set above */}
//       <main style={{ paddingTop: "var(--nav-height)" }} >
//         <section id="home" className="anchor"><Home /></section>
//         <section id="howitworks" className="anchor mt-24"><HowItWorks /></section>
//         <section id="services" className="anchor mt-24"><Services /></section>
//         {/* <section id="bookings" className="anchor"><Bookings /></section> */}
//         {/* <section id="about" className="anchor"><About /></section> */}
//         {/* <section id="testimonials" className="anchor"><Testimonials /></section> */}
//         <section id="contact" className="anchor"><Footer /></section>
//       </main>
//     </div>
//   );
// }

// export default App;
// ...existing code...

// import React, { useEffect, useRef } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Services from "./components/Services";
// import Footer from "./components/Footer";
// import HowItWorks from "./components/HowitWorks";

// function App() {
//   const navRef = useRef(null);

//   useEffect(() => {
//     const setNavHeight = () => {
//       const h = navRef.current ? navRef.current.offsetHeight : 64;
//       document.documentElement.style.setProperty("--nav-height", `${h}px`);
//     };

//     const id = requestAnimationFrame(() => {
//       setTimeout(setNavHeight, 0);
//     });

//     let ro;
//     if (typeof ResizeObserver !== "undefined") {
//       ro = new ResizeObserver(setNavHeight);
//       if (navRef.current) ro.observe(navRef.current);
//     }
//     window.addEventListener("resize", setNavHeight);

//     return () => {
//       cancelAnimationFrame(id);
//       window.removeEventListener("resize", setNavHeight);
//       if (ro) ro.disconnect();
//     };
//   }, []);

//   return (
//     <div className="font-sans scroll-smooth">
//       <Navbar ref={navRef} />
//       {/* No paddingTop needed here */}
//       <main>
//         <section id="home" className="anchor"><Home /></section>
//         <section id="howitworks" className="anchor"><HowItWorks /></section>
//         <section id="services" className="anchor"><Services /></section>
//         <section id="contact" className="anchor"><Footer /></section>
//       </main>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowitWorks";
import RevealSection from "./components/RevealSection";

function App() {
  const navRef = useRef(null);

  useEffect(() => {
    const setNavHeight = () => {
      const h = navRef.current ? navRef.current.offsetHeight : 64;
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };

    const id = requestAnimationFrame(() => {
      setTimeout(setNavHeight, 0);
    });

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(setNavHeight);
      if (navRef.current) ro.observe(navRef.current);
    }
    window.addEventListener("resize", setNavHeight);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", setNavHeight);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className="font-sans scroll-smooth">
      <Navbar ref={navRef} />
      <main>
        <section id="home">
          <RevealSection><Home /></RevealSection>
        </section>
        <section id="howitworks">
          <RevealSection><HowItWorks /></RevealSection>
        </section>
        <section id="services">
          <RevealSection><Services /></RevealSection>
        </section>
        {/* <section id="contact">
        <Footer />
        </section> */}
      </main>
   
    </div>
  );
}

export default App;
