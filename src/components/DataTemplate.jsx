import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import EditData from "./EditData";

const DataTemplate = ({ item }) => {
  const dbData = item._document.data.value.mapValue.fields;
  const [dropDown, setDropdown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async (id) => {
    try {
      const delRef = await deleteDoc(doc(db, "engineers", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-fit h-52 bg-gradient-to-r from-blue-100 to-blue-300 my-4 mx-2 rounded flex flex-col justify-center px-8 relative">
        <p>
          <b>Name: </b>
          {dbData.name.stringValue}
        </p>
        <p>
          <b>Profession: </b>
          {dbData.profession.stringValue}
        </p>
        <p>
          <b>Income: </b>
          {dbData.income.integerValue}
        </p>
        <BsThreeDots
          onClick={() => setDropdown(!dropDown)}
          className="absolute top-0 right-0 text-5xl opacity-50 hover:opacity-100 cursor-pointer hover:bg-gray-200 rounded px-2"
        />
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
        {/* <div className="relative flex justify-center items-center"> */}
        {isEdit && (
          <EditData
            dbData={dbData}
            item={item}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
          />
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default DataTemplate;
