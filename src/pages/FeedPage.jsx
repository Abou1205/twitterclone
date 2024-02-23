import Nav from "../Components/Nav";
import Aside from "../Components/Aside";
import Main from "../Components/Main";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const FeedPage = () => {
  const [user, setUser] = useState(null);

  // subscribe user info
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => unsub();
  }, []);

  return (
    <div className="feed bg-black">
      <Nav className="overflow-auto" user={user} />
      <Main user={user} />
      <Aside user={user} />
    </div>
  );
};

export default FeedPage;
