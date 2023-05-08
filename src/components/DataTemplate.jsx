import React from "react";

const DataTemplate = ({ dbData }) => {
  return (
    <>
      <div className="w-fit h-52 bg-gradient-to-r from-blue-100 to-blue-300 my-4 mx-2 rounded flex flex-col justify-center px-8">
          <p><b>Name: </b>{dbData.name.stringValue}</p>
          <p><b>Profession: </b>{dbData.profession.stringValue}</p>
          <p><b>Income: </b>{dbData.income.integerValue}</p>
      </div>
    </>
  );
};

export default DataTemplate;
