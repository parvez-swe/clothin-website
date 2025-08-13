import Link from "next/link";
import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import UserAuthButtons from "./UserAuthButtons";
// import NavigationBar from "./NavigationBar";
// import SearchBar from "./SearchBar";
// import UserAuthButtons from "./UserAuthButtons";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* Replace with your actual logo image */}
          <img src="/logo.png" alt="Company Logo" className="h-10 mr-2" />
          <span className="text-2xl font-bold text-gray-800">YourBrand</span>
        </Link>

        {/* Navigation Bar */}
        <NavigationBar />

        {/* Right Section: Search, Login/Signup */}
        <div className="flex items-center space-x-4">
          <SearchBar />
          <UserAuthButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
