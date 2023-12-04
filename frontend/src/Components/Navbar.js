import "./Navbar.css";
import logo from "../assets/images/Logo.png"
import hamburgerMenu from "../assets/images/hamburger-menu-50.png"
const Navbar = () => {
  return (
    // <>
    //   <div className="bg-[#2699] p-4">
    //     <div className="max-w-[1240px] flex items-center justify-between mx-auto">
    //       <div className="text-3xl font-bold">Pick-Basket</div>
    //       <div>
    //         <form action="">
    //           <input
    //             type="text"
    //             name="search"
    //             placeholder="Search products"
    //             aria-label="Search products"
    //             className="px-5 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
    //           />
    //           <button className="m-2 rounded-2xl bg-white px-4 py-2 font-bold">Search</button>
    //         </form>
    //       </div>
    //       <ul className="hidden md:flex gap-5 font-bold">
    //         <li>
    //           <a href="/" target="_blank" rel="noopener noreferrer">
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/" target="_blank" rel="noopener noreferrer">
    //             Category
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/" target="_blank" rel="noopener noreferrer">
    //             My Basket
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/" target="_blank" rel="noopener noreferrer">
    //             Login
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </>

    <header className="padding-x py-8  z-10 w-full">
      <nav className="flex justify-between items-center max-container sticky top-0">
        <a href="/"><img src={logo} alt="Logo" className="" height={10} width={80}/></a>
        <form action="">
          <input type="text" id="search" className="px-5 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2" placeholder="Search Item"/>
          <button className="m-2 rounded-2xl px-4 py-2 hover:bg-sky-400">Search</button>
        </form>
        <ul className="flex gap-5 max-lg:hidden"> 
          <li><a href="/">Home</a></li>
          <li><a href="/">Category</a></li>
          <li><a href="/">My Basket</a></li>
          <li><a href="/">Login</a></li>
        </ul>
        <div className="hidden max-lg:block">
          <img src={hamburgerMenu} alt="Menu" width={30} height={30} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
