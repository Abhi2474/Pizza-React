import React, { useContext } from "react";
import { BsCurrencyRupee, BsCartPlus } from "react-icons/bs";
import { FirebaseContext } from "../context/FirebaseContext";

const PizzaTemplete = ({ item }) => {
  const dbData = item._document.data.value.mapValue.fields;

  const { cart, setCart } = useContext(FirebaseContext);

  const handleSubmit = async (id) => {
    console.log(id);
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[id]) {
      _cart.items[id] += 1;
    } else {
      _cart.items[id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;

    setCart(_cart);
  };
  return (
    <>
      <div className=" my-4 mx-2 rounded-lg flex px-8 relative shadow-lg py-4 border mx-auto w-fit hover:shadow-2xl">
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
