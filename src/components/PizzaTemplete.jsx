import { collection, doc, getDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { BsCurrencyRupee, BsCartPlus } from "react-icons/bs";
import { db } from "../firebase";
import { FirebaseContext } from "../context/FirebaseContext";

const PizzaTemplete = ({ item }) => {
  const dbData = item._document.data.value.mapValue.fields;

  const { setCart } = useContext(FirebaseContext);

  const handleSubmit = async (id) => {
    const docRef = doc(db, "pizza", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCart(docSnap.data());
      console.log("Document data:", docSnap.data());
      //   localStorage.setItem("cart", JSON.stringify({ ...data, data }));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <>
      <div className=" my-4 mx-2 rounded-lg flex px-8 relative shadow-lg py-4 border mx-auto w-fit">
        <img
          className=" rounded w-48 mr-4"
          src={dbData.image?.stringValue}
          alt=""
        />
        <div className="bg-gradient-to-r from-orange-200 to-orange-300 px-4 pt-2 w-64 rounded-md text-lg">
          <p>
            <b>Name: </b>
            {dbData.name.stringValue}
          </p>
          <p>
            <b>Size: </b>
            {dbData.size.stringValue}
          </p>
          <p className="flex items-center">
            <b>Price: </b>
            <BsCurrencyRupee />
            {dbData.price.stringValue}
          </p>
          <button
            onClick={() => handleSubmit(item.id)}
            className="bg-[#FFB84C] hover:bg-orange-400 text-sm hover:text-lg rounded px-2 py-1 mt-8 text-white font-bold flex items-center"
          >
            <BsCartPlus className="mr-2" />
            Add Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default PizzaTemplete;
