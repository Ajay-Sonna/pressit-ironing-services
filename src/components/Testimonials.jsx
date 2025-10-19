import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Riya Sharma",
    feedback: "Impeccable service! My clothes look brand new every time.",
  },
  {
    name: "Amit Verma",
    feedback: "Convenient pickup and delivery. Truly a premium experience.",
  },
  {
    name: "Sneha Kapoor",
    feedback: "Professional, reliable, and perfect results. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-50 rounded-xl shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 italic">“{t.feedback}”</p>
              <h4 className="mt-4 font-semibold text-gray-800">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
