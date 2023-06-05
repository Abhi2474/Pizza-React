import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { PizzaTemplete } from "../components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PizzaHome = () => {
  const [data, setData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleButtonClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "pizza"));
    console.log(querySnapshot.docs);
    setData(querySnapshot.docs);
  }
  const memoizedFetchData = useMemo(() => fetchData, []);

  useEffect(() => {
    document.title = "Home";

    memoizedFetchData();
  }, [memoizedFetchData]);

  return (
    <>
      <div className="flex justify-between container mx-auto shadow-lg mt-10 rounded bg-white">
        <div className="flex flex-col justify-center pl-4">
          <i className="text-gray-800 text-5xl ">Are you hungry?</i>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-orange-500 hover:bg-orange-600 py-2 px-5 rounded-full text-white font-bold w-1/2 my-4"
            onClick={handleButtonClick}
          >
            Order Now
          </motion.button>
        </div>
        <img src="src/assets/mainPizza-removebg-preview.png" alt="" />
      </div>
      <div
        className={`flex flex-wrap justify-evenly my-10 container mx-auto overflow-hidden`}
      >
        {data.map((item) => {
          const dbData = item._document.data.value.mapValue.fields;
          return (
            <PizzaTemplete key={item.id} item={item} setIsAdded={setIsAdded} />
          );
        })}
      </div>
    </>
  );
};

export default PizzaHome;
