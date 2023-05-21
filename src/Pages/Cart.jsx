import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IoMdAddCircle } from "react-icons/io";
import { HiMinusCircle } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

const Cart = () => {
  const { cart, setCart } = useContext(FirebaseContext);
  console.log(cart);

  //   let prod;
  const [product, setProduct] = useState([]);
  const [isDelDisable, setIsDelDisable] = useState(false);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "pizza"));
    const prod = querySnapshot.docs;

    // We get the all items and then filter only which are in cart by their unique id
    const dataFilter = prod.filter((item) => {
      return cart.items[`${item.id}`];
    });
    setProduct(dataFilter);
  };
  console.log(product);

  useEffect(() => {
    document.title = "Cart";
    fetchData();
  }, [cart]);

  const Qty = (productId) => {
    return cart.items[productId];
  };

  let totalSum = 0;

  const sum = (id, price) => {
    let total = Qty(id) * price;
    totalSum += total;
    return total;
  };

  const increment = (id) => {
    const _cart = { ...cart };
    _cart.items[id] += 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrement = (id) => {
    const _cart = { ...cart };
    if (_cart.items[id] < 2) {
      return;
    }
    _cart.items[id] -= 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const deleteItem = (id) => {
    const _cart = { ...cart };
    _cart.totalItems -= _cart.items[id];
    delete _cart.items[id];
    const updatedProductsList = product.filter((product) => product.id !== id);
    setProduct(updatedProductsList);
    // setProduct(_cart);
    setCart(_cart);
  };

  return (
    <>
      {!product.length ? (
        <h1 className="text-7xl text-center mt-20">Cart is empty</h1>
      ) : (
        <>
          <div className="w-2/3 mx-auto mb-36">
            {product.map((item) => {
              const dbData = item._document.data.value.mapValue.fields;

              return (
                <div
                  key={item.id}
                  className="flex items-center shadow-lg my-4 py-4 px-4 justify-evenly rounded-lg"
                >
                  <img className="w-36" src={dbData.image.stringValue} alt="" />
                  <div className="px-4 py-2 flex items-center justify-evenly w-full">
                    <h1 className="text-xl w-52">
                      {dbData.name.stringValue} -{" "}
                      <b>{dbData.size.stringValue}</b>
                    </h1>
                    <p className="flex items-center text-xl my-3 w-32">
                      <FaRupeeSign />
                      {sum(item.id, Number(dbData.price.stringValue))}
                    </p>
                    <div className="flex items-center">
                      <IoMdAddCircle
                        className="text-3xl cursor-pointer opacity-80 hover:opacity-100"
                        onClick={() => increment(item.id)}
                      />
                      <span className="bg-gray-800 w-10 text-center rounded px-1 py-1 text-sm mx-2 text-white opacity-80">
                        {Qty(item.id)}
                      </span>
                      <HiMinusCircle
                        onClick={() => decrement(item.id)}
                        className="text-3xl cursor-pointer opacity-80 hover:opacity-100"
                      />
                    </div>
                  </div>
                  <MdDeleteForever
                    onClick={() => deleteItem(item.id)}
                    className={`text-4xl text-red-500 hover:text-red-700 cursor-pointer ${
                      isDelDisable ? "pointer-events-none" : ""
                    }`}
                  />
                </div>
              );
            })}
            <hr />
            <div className="flex flex-col">
              <p className="text-xl flex items-center my-5">
                <b className="mr-2">Grand Total: </b>
                <FaRupeeSign />
                {totalSum}
              </p>
              <button className="bg-orange-700 text-white font-bold py-1 px-2 rounded my-2">
                Order Now
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
