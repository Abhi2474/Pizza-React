import React from "react";
import { useNavigate } from "react-router-dom";
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
      .then(async (res) => {
        navigate("/");
      })
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
          <Form className="py-5 my-4 flex flex-col justify-between items-center bg-gradient-to-r from-green-400 to-green-600">
            <h1 className="text-3xl text-center font-bold mb-4">Login Form</h1>

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
              className="bg-green-100 my-4 px-4 rounded py-1 text-lg cursor-pointer hover:bg-green-600"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
