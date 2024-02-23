import { useState } from "react";
import { auth, provider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.info("Account is generated");
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.code);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.info("Succesfully logged in");
          navigate("/home");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-credential") {
            toast.error(`Sorry there is an error: ${err.code}`);
            setIsError(true);
          }
        });
    }
  };

  // password reset
  const sendMail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Password reset link has been sent to your email address");
    });
  };

  // google login
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate("/home"));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-2 py-4 px-12 rounded-lg w-[350px] sm:w-[500px] sm:gap-4 sm:py-4 sm:px-8 ">
        {/* logo */}
        <div className="flex justify-center">
          <img src="x-logo.webp" className="h-[40px] sm:h-[60px]" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a giriş yap</h1>

        {/* google button */}
        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center bg-white py-2 px-8 rounded-full text-black gap-2 transition hover:bg-gray-300"
        >
          <img src="/google-logo.svg" className="h-[20px]" />
          <span className="whitespace-nowrap text-center sm:text-xl">
            Google ile giriş yap
          </span>
        </button>
        {/* login form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            required
          />

          <label className="mt-5">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            required
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Signup" : "Login"}
          </button>

          <p className="mt-3 gap-3 flex justify-center">
            <span className="text-gray-500">
              {isSignUp ? "You have an account" : "You do not have account "}
            </span>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Login" : "Signup"}
            </span>
          </p>
        </form>

        {isError && (
          <p
            onClick={sendMail}
            className="text-center text-red-500 cursor-pointer"
          >
            Forgot your password ?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
