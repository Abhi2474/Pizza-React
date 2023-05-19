import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseContext } from "../context/FirebaseContext";

const Navbar = () => {
  const { loginData, authenticated } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <ul className="flex justify-center font-bold text-lg py-2">
        <li>
          <Link className="hover:underline mx-5" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/api">
            Create
          </Link>
        </li>
        {!authenticated ? (
          <>
            <li>
              <Link className="mx-5 hover:underline" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/signup">
                SignUp
              </Link>
            </li>
          </>
        ) : (
          <button onClick={handleSignOut} className="mx-5">
            Logout
          </button>
        )}
        <b>{loginData ? loginData.displayName : " "}</b>
      </ul>
    </>
  );
};

export default Navbar;
