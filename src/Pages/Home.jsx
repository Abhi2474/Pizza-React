import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { collection, addDoc, snapshotEqual } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Data } from "../components";
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const formDiv = "flex flex-col my-1 pt-5 w-1/3 mx-auto";
const formField = "rounded py-2 px-3 focus:outline-none border my-1";

const Home = (props) => {
  const { authenticated, setAuthenticated } = useContext(FirebaseContext);
  const [value, setValue] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const uploadImage = async () => {
    const metadata = {
      contentType: image.type,
    };

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setErrorMsg("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("unauthorized", error);
            break;
          case "storage/cancelled":
            console.log("cancelled", error);
            break;
          case "storage/unkown":
            console.log("unkown", error);
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          console.log("file available at", downloadURL);
        });
      }
    );
  };

  const firestoreDoc = async () => {
    try {
      const docRef = await addDoc(collection(db, "pizza"), value);
      console.log("Document written with ID: ", docRef.id);
      setErrorMsg("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue({ name, size, price, image });
  }, [name, size, price, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.length || !size.length || !price || !image) {
      setErrorMsg("* All fields are mandatory");
    } else {
      setErrorMsg("");
    }
    console.log(value);

    await firestoreDoc();
  };
  return (
    <div className="flex container mx-auto">
      <div className="w-1/2 bg-gray-200 my-6">
        <h1 className="text-5xl font-serif text-center font-bold mt-6">
          Create Items
        </h1>
        <form className={formDiv} onSubmit={handleSubmit}>
          <input
            className={formField}
            type="text"
            name=""
            id=""
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <select
            name=""
            id=""
            className={formField}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">--Select Size--</option>
            <option value="L">Large</option>
            <option value="M">Medium</option>
            <option value="S">Small</option>
          </select>
          <input
            className={formField}
            type="number"
            name=""
            id=""
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <p className="text-red-900 font-bold">{errorMsg}</p>
          <button
            disabled={!name.length || !size.length || !price ? true : false}
            className="bg-orange-500 text-white font-bold py-2 rounded my-2"
          >
            Submit
          </button>
        </form>
        <div className={formDiv}>
          <input
            className=""
            type="file"
            name=""
            id=""
            placeholder="Price"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            disabled={!image ? true : false}
            onClick={uploadImage}
            className="bg-green-800 text-white text-sm px-1 font-bold py-1 my-1 rounded"
          >
            Upload Photo
          </button>
        </div>
      </div>

      {authenticated && <Data />}
    </div>
  );
};

export default Home;
