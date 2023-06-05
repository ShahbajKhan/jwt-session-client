import { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  // Hooks for location and navigation from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();
  // Get the location from which user was redirected to auth page
  const from = location.state?.from?.pathname || "/";
  // function for handling google login and saving the user in db
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const fullName = form.fullName.value;
    console.log({ email, password, fullName });
    createUser(email, password)
      .then((result) => {
        updateUserProfile(fullName)
          .then(() => {
            const saveUser = { name: fullName, email: email };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  toast.success(`Hello! ${email}! Welcome!`);
                  navigate("/");
                }
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="mx-auto max-w-xs">
      <form onSubmit={handleSignUp}>
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="text"
          name="fullName"
          placeholder="Full Name"
        />
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <FaUserPlus size={20}></FaUserPlus>
          <span className="ml-3">Sign Up</span>
        </button>
      </form>
      <p className="mt-6 text-xs text-gray-600 text-center">
        I agree to abide by hero tech&apos;s{" "}
        <a href="#" className="border-b border-gray-500 border-dotted">
          Terms of Service
        </a>
        and its
        <a href="#" className="border-b border-gray-500 border-dotted">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default SignUp;
