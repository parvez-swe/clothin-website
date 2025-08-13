import Link from "next/link";

const NavigationBar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Buy", href: "/buy" },
    { name: "Rent", href: "/rent" },
    { name: "Sell", href: "/sell" },
    { name: "Agents/About Us", href: "/agents" },
    { name: "Contact Us", href: "/contact" },
    { name: "Blog/Resources", href: "/blog" },
  ];

  return (
    <nav>
      <ul className="flex space-x-6">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
