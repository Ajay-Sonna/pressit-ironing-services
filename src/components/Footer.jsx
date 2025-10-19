const Footer = () => {
  return (
    <footer className="py-10 bg-gray-900 text-gray-300 text-center">
      <h3 className="text-xl font-semibold text-white">Press & Perfect</h3>
      <p className="mt-2">📞 +91 9876543210 | 📧 support@pressperfect.com</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href="#" className="hover:text-white">Instagram</a>
        <a href="#" className="hover:text-white">Twitter</a>
        <a href="#" className="hover:text-white">WhatsApp</a>
      </div>
      <p className="mt-6 text-sm text-gray-500">© 2025 Press & Perfect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;


// const Footer = () => {
//   return (
//     <footer className="py-6 bg-gray-900 text-gray-400 text-center">
//       <p>© {new Date().getFullYear()} Press & Perfect. All rights reserved.</p>
//       <p className="mt-2">Designed with ❤️ for convenience & luxury.</p>
//     </footer>
//   );
// };

// export default Footer;
