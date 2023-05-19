import { doc, updateDoc } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { db } from "../firebase";
import { RxCross2 } from "react-icons/rx";

const formDiv = "flex flex-col my-1";
const formField = "rounded py-1 px-3 focus:outline-none";

const EditData = ({ dbData, item, setIsEdit, isEdit }) => {
  const initialValues = {
    name: dbData.name.stringValue,
    size: dbData.size.stringValue,
    price: dbData.price.stringValue,
  };

  const handleUpdate = async (values, id) => {
    try {
      const updateRef = await updateDoc(doc(db, "pizza", id), values);
      setIsEdit(!isEdit);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute z-10 ">
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log("object")}
      >
        {({ isSubmitting, values }) => (
          <Form className="py-5 my-4 flex flex-col justify-between items-center bg-gradient-to-r from-green-600 to-green-700 px-10 rounded relative">
            <h1 className="text-3xl text-center font-bold mb-5 text-white">
              Create Data{" "}
            </h1>

            <div className={formDiv}>
              <label htmlFor="name">Name</label>
              <Field className={formField} type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            {/* 
            <div className={formDiv}>
              <label htmlFor="size">size</label>
              <Field className={formField} type="text" name="size" />
              <ErrorMessage name="size" component="div" />
            </div> */}

            <select
              name="size"
              id=""
              className={formField}
              // onChange={(e) => setSize(e.target.value)}
            >
              <option value="">--Select Size--</option>
              <option value="L">Large</option>
              <option value="M">Medium</option>
              <option value="S">Small</option>
            </select>

            <div className={formDiv}>
              <label htmlFor="price">Price</label>
              <Field className={formField} type="text" name="price" />
              <ErrorMessage name="price" component="div" />
            </div>

            <button
              onClick={() => handleUpdate(values, item.id)}
              className="bg-green-100 my-4 px-4 rounded py-1 text-lg"
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </button>
            <RxCross2
              onClick={() => setIsEdit(!isEdit)}
              className="absolute top-1 right-1 text-2xl text-white cursor-pointer"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditData;
