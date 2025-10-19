const services = [
  { title: "Ironing", desc: "Crisp and fresh clothes every time.", icon: "👔" },
  { title: "Laundry", desc: "Gentle wash with doorstep delivery.", icon: "🧺" },
  { title: "Dry Cleaning", desc: "Safe care for your delicate fabrics.", icon: "🧥" },
  { title: "Express Service", desc: "Get your clothes ready in just 4 hours.", icon: "⚡" },
];

const Services = () => {
  return (
    <div className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800">Our Services</h2>
      <div className="max-w-6xl mx-auto mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4 px-6">
        {services.map((service, idx) => (
          <div key={idx} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition text-center">
            <div className="text-5xl">{service.icon}</div>
            <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
            <p className="mt-2 text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;


// import { motion } from "framer-motion";
// import { Shirt, Truck, Sparkles } from "lucide-react";

// const services = [
//   {
//     icon: <Shirt className="w-10 h-10 text-sky-600" />,
//     title: "Professional Ironing",
//     description: "Your clothes are carefully pressed for a crisp, polished look."
//   },
//   {
//     icon: <Truck className="w-10 h-10 text-sky-600" />,
//     title: "Doorstep Pickup & Delivery",
//     description: "Convenient pickup and delivery right at your home or office."
//   },
//   {
//     icon: <Sparkles className="w-10 h-10 text-sky-600" />,
//     title: "Luxury Finish",
//     description: "Premium attention to detail, ensuring perfection in every fold."
//   },
// ];

// const Services = () => {
//   return (
//     <section id="services" className="py-20 bg-white">
//       <div className="container mx-auto text-center">
//         <motion.h2
//           className="text-4xl font-bold text-gray-800 mb-12"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           Our Services
//         </motion.h2>
//         <div className="grid md:grid-cols-3 gap-10">
//           {services.map((service, i) => (
//             <motion.div
//               key={i}
//               className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <div className="flex justify-center mb-4">{service.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-700">{service.title}</h3>
//               <p className="text-gray-500 mt-2">{service.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;
