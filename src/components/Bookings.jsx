const Bookings = () => {
  return (
    <div className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Book a Service
      </h2>
      <form className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-xl p-8 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg px-4 py-3 focus:ring focus:ring-blue-300"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border rounded-lg px-4 py-3 focus:ring focus:ring-blue-300"
        />
        <input
          type="date"
          className="w-full border rounded-lg px-4 py-3 focus:ring focus:ring-blue-300"
        />
        <select className="w-full border rounded-lg px-4 py-3 focus:ring focus:ring-blue-300">
          <option>Select Service</option>
          <option>Ironing</option>
          <option>Laundry</option>
          <option>Dry Cleaning</option>
          <option>Express Service</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Bookings;
