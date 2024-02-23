import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../../firebase/config";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { BsTrashFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";

const EditTweet = ({ tweet, close }) => {
  const [isPicDelete, setIsPicDelete] = useState(false);

  const inputRef = useRef();

  // save
  const handleSave = async () => {
    // 1 input ref
    const newText = inputRef.current.value;

    // document reference
    const tweetRef = doc(db, "tweets", tweet.id);

    // update document
    if (isPicDelete) {
      await updateDoc(tweetRef, {
        textContent: newText,
        imageContent: null,
        isEdited: true,
      });
    } else {
      await updateDoc(tweetRef, {
        textContent: newText,
        isEdited: true,
      });
    }

    close();
  };

  return (
    <>
      <input
        defaultValue={tweet.textContent}
        ref={inputRef}
        className="rounded p-1 px-2 text-black"
        type="text"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded shadow  hover:shadow-green-400"
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className="mx-5 p-2 text-red-400 rounded shadow  hover:shadow-red-400"
      >
        <ImCancelCircle />
      </button>
      {tweet.imageContent && (
        <div className="relative ">
          <img
            className={`${
              isPicDelete ? "blur" : ""
            } my-2 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
          />
          <button
            onClick={() => setIsPicDelete(!isPicDelete)}
            className="absolute top-0 right-0 text-xl p-2 bg-white text-red-500 transition hover:scale-90 rounded-full"
          >
            {isPicDelete ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditTweet;
