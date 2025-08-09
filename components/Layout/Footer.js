const Footer = () => {
  return (
<footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-base">
          <p>&copy; {new Date().getFullYear()} TaskBoard. All rights reserved.</p>
          <p className="mt-2">Simple and effective task management.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
