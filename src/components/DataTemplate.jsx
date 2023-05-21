import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsThreeDots, BsCurrencyRupee } from "react-icons/bs";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import EditData from "./EditData";

const DataTemplate = ({ item }) => {
  const dbData = item._document.data.value.mapValue.fields;
  const [dropDown, setDropdown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async (id) => {
    try {
      // This command will delete the one document from the pizza collection
      const delRef = await deleteDoc(doc(db, "pizza", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" my-4 mx-2 rounded-lg flex px-8 relative shadow-lg py-3 ">
        <img
          className=" rounded w-40 mr-4"
          src={dbData.image?.stringValue}
          alt=""
        />
        <div className="bg-gradient-to-r from-orange-200 to-orange-300 px-4 pt-2 w-64 rounded-md">
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
          <BsThreeDots
            onClick={() => setDropdown(!dropDown)}
            className="absolute text-5xl opacity-50 hover:opacity-100 cursor-pointer hover:bg-gray-200 rounded px-2 top-0 right-8"
          />
        </div>
        {dropDown && (
          <div className="text-xl bg-white w-fit py-2 px-3 rounded pb-4 absolute top-8 right-1">
            <MdDelete
              onClick={() => handleDelete(item.id)}
              className="my-1 cursor-pointer "
            />
            <FaEdit
              onClick={() => setIsEdit(!isEdit)}
              className="cursor-pointer "
            />
          </div>
        )}
        {isEdit && (
          <EditData
            dbData={dbData}
            item={item}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
          />
        )}
      </div>
    </>
  );
};

export default DataTemplate;
