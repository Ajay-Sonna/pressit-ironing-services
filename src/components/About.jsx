const About = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:flex items-center gap-10">
        <img
          src="https://via.placeholder.com/400x300"
          alt="About Us"
          className="rounded-xl shadow-md mb-6 md:mb-0"
        />
        <div>
          <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            At <span className="font-semibold text-blue-600">Press & Perfect</span>, we believe
            that fresh, neatly pressed clothes bring confidence to your day. Our team is committed
            to delivering professional  ironing services right to your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
