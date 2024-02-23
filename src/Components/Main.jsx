import { useState } from "react";
import Form from "../Components/Form";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "./Post/Post";
import Loader from "./Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  const tweetCols = collection(db, "tweets");

  // get data in real time
  useEffect(() => {
    const q = query(tweetCols, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      // temporary array
      const tempTweets = [];

      // map all documents
      snapshot.forEach((doc) => {
        tempTweets.push({ id: doc.id, ...doc.data() });
      });

      // import the data to state
      setTweets(tempTweets);
    });

    return () => unsub();
  }, []);

  return (
    <main className="border border-gray-900 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-900">
        Homepage
      </header>

      <Form user={user} />

      {!tweets ? (
        <Loader style={"w-6 h-6 mx-auto my-10"} />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
