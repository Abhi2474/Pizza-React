import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PizzaTemplete from "../components/PizzaTemplete";

const PizzaHome = () => {
  const [data, setData] = useState([]);

  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "pizza"));
    // const querySnapshot = await getDocs(collection(db, "engineers"));
    console.log(querySnapshot.docs);
    setData(querySnapshot.docs);
  }
  const memoizedFetchData = useMemo(() => fetchData, []);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  return (
    <>
      <div className="flex flex-wrap justify-evenly my-10 container mx-auto">
        {data.map((item) => {
          const dbData = item._document.data.value.mapValue.fields;
          return <PizzaTemplete key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};

export default PizzaHome;
