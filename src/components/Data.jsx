import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import DataTemplate from "./DataTemplate";

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "engineers"));
      setData(querySnapshot.docs);
    }
    fetchData();
  }, []);

  return (
    <div className="flex my-2 container mx-auto mb-16">
      {data.map((item) => {
        const dbData = item._document.data.value.mapValue.fields;
        return <DataTemplate key={item.id} dbData={dbData} />;
      })}
    </div>
  );
};

export default Data;
