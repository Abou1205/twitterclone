import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import { toast } from "react-toastify";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const tweetCols = collection(db, "tweets");

  // if file is image upload to storage
  // get the image url to the calling area
  const uploadImage = async (file) => {
    // if file is not image stop the function
    if (!file || !file.type.startsWith("image")) return null;
    // create reference
    const fileRef = ref(storage, v4() + file.name);
    // upload file
    await uploadBytes(fileRef, file);
    // get the file url
    return await getDownloadURL(fileRef);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // input data
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // text or image content > null
    if (!textContent && !imageContent) {
      return toast.info("Please enter a content");
    }

    setIsLoading(true);

    // upload image
    const url = await uploadImage(imageContent);

    // add new document to tweets collection
    await addDoc(tweetCols, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    //reset form
    e.target.reset();

    // finish loading
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        src={user?.photoURL}
        className="rounded-full h-[35px] md:h-[45px] mt-1"
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent outline-none my-2 md:text-2xl"
          placeholder="What's going on?"
          type="text"
        />
        <div className="flex justify-between items-center">
          <label
            htmlFor="image-input"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
          >
            <BsCardImage />
          </label>
          <input type="file" id="image-input" className="hidden" />
          <button
            disabled={isLoading}
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[45px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <p>Yükleniyor...</p> : "Tweet"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
