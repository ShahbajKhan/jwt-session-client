import { useContext } from "react";
import { FaUserCheck } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  // Hooks for location and navigation from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();
  // Get the location from which user was redirected to auth page
  const from = location.state?.from?.pathname || "/";
  // function for handling  login
  /** 
   * here we are not saving in database. because if a user logs in successfully that means he is a registered user.
   **/
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
    signIn(email, password)
      .then((result) => {
        toast.success(`Hello! ${result.user.email}! Welcome Back!`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="mx-auto max-w-xs ">
      <form onSubmit={handleLogin}>
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          name="email"
          placeholder="Email"
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
          <FaUserCheck size={20}></FaUserCheck>
          <span className="ml-3">Sign In</span>
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

export default SignIn;
