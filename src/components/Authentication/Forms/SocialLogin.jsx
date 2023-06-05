import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  // Hooks for location and navigation from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();
  // Get the location from which user was redirected to auth page
  const from = location.state?.from?.pathname || "/";
  // function for handling google login and saving the user in db
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="flex flex-col items-center">
      <button
        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        onClick={handleGoogleSignIn}
      >
        <div className="bg-white p-2 rounded-full">
          <FcGoogle></FcGoogle>
        </div>
        <span className="ml-4">Connect using Google</span>
      </button>

      <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
        <div className="bg-white p-1 rounded-full">
          <FaGithub></FaGithub>
        </div>
        <span className="ml-4">Connect using GitHub</span>
      </button>
    </div>
  );
};

export default SocialLogin;
