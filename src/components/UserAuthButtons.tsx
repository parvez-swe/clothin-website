import Link from "next/link";

const UserAuthButtons = () => {
  // In a real app, you'd check for user authentication status
  const isLoggedIn = false; // Placeholder

  return (
    <div className="flex space-x-3">
      {isLoggedIn ? (
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
          Dashboard
        </Link>
      ) : (
        <>
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default UserAuthButtons;
