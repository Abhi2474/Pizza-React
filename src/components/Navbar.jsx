import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseContext } from "../context/FirebaseContext";
import { GiShoppingCart } from "react-icons/gi";

const Navbar = () => {
  const { loginData, authenticated } = useContext(FirebaseContext);

  const { cart } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between py-2 px-4 bg-orange-300 shadow-lg rounded sticky top-0 z-10">
      <b className="text-2xl">{loginData ? loginData.displayName : " "}</b>

      <ul className="flex justify-center font-bold text-2xl py-2">
        <li>
          <Link className="hover:underline mx-5" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:underline mr-5" to="/api">
            Create
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline ml-5 flex items-center relative"
            to="/cart"
          >
            <GiShoppingCart className="text-4xl mr-2" />
            <p className="w-fit text-center absolute top-0 right-0 text-white rounded-full text-xs bg-gray-800 p-1 ">
              {cart.totalItems ? cart.totalItems : 0}
            </p>
          </Link>
        </li>
      </ul>

      {!authenticated ? (
        <div>
          <Link
            className="mx-5 hover:underline bg-gray-600 hover:bg-gray-700 py-2 px-3 rounded text-white font-bold hover:shadow-lg"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="hover:underline bg-gray-600 hover:bg-gray-700 py-2 px-3 rounded text-white font-bold hover:shadow-lg"
            to="/signup"
          >
            SignUp
          </Link>
        </div>
      ) : (
        <button
          onClick={handleSignOut}
          className="mx-5 bg-gray-600 hover:bg-gray-700 py-2 px-3 rounded text-white font-bold text-sm hover:shadow-lg"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
