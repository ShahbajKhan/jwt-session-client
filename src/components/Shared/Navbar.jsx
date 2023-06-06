import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { IoIosListBox } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/my-cart?email=${user?.email}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCartData(data[0].totalCount[0].count));
  }, [user]);
  const handleLogOut = () => {
    logOut()
      .then(() => toast.success(`Successfully logged out!`))
      .catch(() => {
        toast.error(`Failed to logout!`);
      });
  };
  console.log({ user });
  return (
    <nav className="h-14 bg-indigo-200 rounded-full px-5">
      <ul className="h-full  mx-auto flex justify-between items-center gap-3 font-semibold text-indigo-900">
        <h1 className="flex-1">Hero Tech</h1>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/generate-jwt">JWT</Link>
        </li>
        {user?.email && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        <li>
          <Link to="/about">About</Link>
        </li>
        <li title="Wishlist" className="bg-indigo-500 p-2 rounded-full">
          <Link to="/">
            <IoIosListBox className="text-white" />
          </Link>
        </li>
        <li title="cart" className="bg-indigo-500 p-2 rounded-full">
          <Link to="/my-cart">
            <div className="flex relative">
              <BsFillCartFill className="text-white " />
              <span className="absolute bottom-3 left-4 bg-blue-100 text-blue-800 text-xs font-medium mr-2 p-0.5  rounded dark:bg-blue-900 dark:text-blue-300">
                {cartData || 0}
              </span>
            </div>
          </Link>
        </li>

        <li>
          {user?.email ? (
            <button
              className="bg-orange-700 text-white p-2 rounded-lg"
              onClick={handleLogOut}
            >
              Logout
            </button>
          ) : (
            <Link to="/authentication">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
