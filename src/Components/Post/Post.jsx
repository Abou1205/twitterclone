import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment/moment";
import { auth, db } from "../../firebase/config";
import {
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import Dropdown from "./Dropdown";
import { useState } from "react";
import EditTweet from "./EditTweet";

const Post = ({ tweet }) => {
  const [isEdit, setIsEdit] = useState(false);

  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // like event
  // add user id to likes array
  const handleLike = async () => {
    // get reference
    const ref = doc(db, "tweets", tweet.id);

    // update document
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  // tweet delete
  const handleDelete = async () => {
    // user confirmation
    if (confirm("Are you confirm to delete your tweet ?")) {
      // get reference
      const tweetRef = doc(db, "tweets", tweet.id);

      // delete document
      await deleteDoc(tweetRef);
    }
  };

  return (
    <div className="relative flex gap-3 py-6 px-3 border-b-[1px] border-gray-700">
      <img src={tweet.user.photo} className="w-10 h-10 rounded-full" />
      <div className="w-full">
        {/* top > user informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p>{tweet.user.name}</p>
            <p>@{tweet.user.name}</p>
            <p>{date}</p>
            {tweet.isEdited && <p className="text-sm"> *Edited*</p>}
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown handleDelete={handleDelete} setIsEdit={setIsEdit} />
          )}
        </div>

        {/* middle > tweet info */}
        <div className="my-4">
          {/* if edit mode true */}
          {isEdit && <EditTweet tweet={tweet} close={() => setIsEdit(false)} />}

          {tweet.textContent && !isEdit && <p>{tweet.textContent}</p>}

          {tweet.imageContent && !isEdit && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>

        {/* footer > interactive buttons */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436]">
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className="flex justify-center items-center gap-1 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e857d969]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length > 0 ? tweet.likes.length : null}</span>
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
