import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";

const formDiv = "flex flex-col my-1";
const formField = "rounded py-1 px-3 focus:outline-none";

const Login = () => {
  const navigate = useNavigate();

  const getErr = (word) => {
    word = word.split("/");
    return word[1].slice(0, -2);
  };

  const handleSubmit = (values, { resetForm }) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      // .then(async (res) => {
      //   navigate("/");
      // })
      .catch((err) => {
        console.log(err);
      });

    resetForm();
  };

  const initialValues = { email: "", password: "" };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="w-1/2 mx-auto rounded py-10 my-20 flex flex-col justify-between items-center bg-gradient-to-r from-orange-400 to-red-400">
            <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">
              Login Form
            </h1>

            <div className={formDiv}>
              <label htmlFor="email">Email</label>
              <Field className={formField} type="text" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className={formDiv}>
              <label htmlFor="password">Password</label>
              <Field className={formField} type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button
              className="bg-gray-100 my-4 px-4 rounded py-1 text-lg cursor-pointer hover:bg-gray-600 hover:text-white"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
            <Link
              className="hover:underline hover:italic text-gray-800 font-bold"
              to={"/signup"}
            >
              New User ? Click Here
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
