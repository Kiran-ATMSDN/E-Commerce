import "./Navbar.css";
const Navbar = () => {
  return (
    <>
      <div className="bg-[#2699] p-4">
        <div className="max-w-[1240px] flex items-center justify-between mx-auto">
          <div className="text-3xl font-bold">Pick-Basket</div>
          <ul className="hidden md:flex gap-5 font-bold">
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                Home
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                Category
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                My Basket
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
