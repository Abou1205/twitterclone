import { collection, count, getAggregateFromServer } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { CiSearch } from "react-icons/ci";
import { trends } from "../constants";
import { BsThreeDots } from "react-icons/bs";

const Aside = () => {
  const [number, setNumber] = useState(null);

  const tweetCols = collection(db, "tweets");

  useEffect(() => {
    getAggregateFromServer(tweetCols, {
      tweetsCount: count(),
    }).then((res) => setNumber(res.data()));
  }, []);

  return (
    <div className="max-lg:hidden mx-5">
      <div className="bg-[#16181C] text-m rounded-2xl p-2 flex items-center gap-3 mt-2">
        <button>
          <CiSearch />
        </button>
        <input
          placeholder="Search"
          type="text"
          className="w-full bg-[#16181C] border-none outline-none"
        />
      </div>
      <div className="bg-[#16181C] rounded-2xl px-4 py-2 mt-4">
        <h1 className="font-bold">Subscribe to Premium</h1>
        <p className="mt-2">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="bg-blue-600 flex items-center justify-center mt-2 px-4 min-w-[85px] min-h-[35px] rounded-full transition hover:bg-blue-800">
          Subscribe
        </button>
      </div>
      <div className="bg-[#16181C] rounded-2xl px-4 py-2 mt-4">
        <h1 className="font-bold text-xl">Trends For You</h1>
        {trends.map((trend, i) => (
          <div
            key={i}
            className="flex justify-between items-center mt-2 hover:cursor-pointer rounded-2xl p-2"
          >
            <div>
              <span className="font-extralight text-xs">{trend.tags}</span>
              <p className="font-medium">#{trend.title}</p>
              <span className="font-extralight text-xs">{trend.tweets}</span>
            </div>

            <button className="hover:bg-[#505050b7] rounded-2xl p-2 hover:text-blue-600">
              <BsThreeDots />
            </button>
          </div>
        ))}
      </div>
      <h1 className="mt-5">Total Tweets Number: {number?.tweetsCount}</h1>
    </div>
  );
};

export default Aside;
