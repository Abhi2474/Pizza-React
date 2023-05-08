import React, { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Data } from "../components";

const formDiv = "flex flex-col my-1";
const formField = "rounded py-1 px-3 focus:outline-none";

const Home = (props) => {
  const { authenticated, setAuthenticated } = useContext(FirebaseContext);

  const handleLogout = () => {
    auth.signOut();
    setAuthenticated(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    try {
      const docRef = await addDoc(collection(db, "engineers"), values);
      console.log("Document written with ID: ", docRef.id);
      resetForm();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const initialValues = { name: "", profession: "", income: "" };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 my-4 flex flex-col justify-between items-center bg-gradient-to-r from-green-500 to-green-600">
            <h1 className="text-3xl text-center font-bold mb-5">Create Data </h1>

            <div className={formDiv}>
              <label htmlFor="name">Name</label>
              <Field className={formField} type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div className={formDiv}>
              <label htmlFor="profession">Profession</label>
              <Field className={formField} type="text" name="profession" />
              <ErrorMessage name="profession" component="div" />
            </div>

            <div className={formDiv}>
              <label htmlFor="income">Income</label>
              <Field className={formField} type="number" name="income" />
              <ErrorMessage name="income" component="div" />
            </div>

            <button
              className="bg-green-100 my-4 px-4 rounded py-1 text-lg"
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </button>
          </Form>
        )}
      </Formik>

      {authenticated && <Data />}
    </>
  );
};

export default Home;
