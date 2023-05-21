import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import DataTemplate from "./DataTemplate";

const Data = () => {
  const [data, setData] = useState([]);

  async function fetchData() {
    // This gives the complete collection of pizza
    const querySnapshot = await getDocs(collection(db, "pizza"));
    // console.log(querySnapshot.docs);
    setData(querySnapshot.docs);
  }
  const memoizedFetchData = useMemo(() => fetchData, []);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  return (
    <div className="grid grid-cols-2 my-2 container mx-auto mb-16">
      {data.map((item) => {
        const dbData = item._document.data.value.mapValue.fields;
        return <DataTemplate key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Data;
