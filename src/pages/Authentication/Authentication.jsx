import { useState } from "react";
import SignUp from "../../components/Authentication/Forms/SignUp";

import SocialLogin from "../../components/Authentication/Forms/SocialLogin";
import SignIn from "../../components/Authentication/Forms/SignIn";


const Authentication = () => {
  const [isNew, setIsNew] = useState(false);

  return (
    <section className=" bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign up for Hero Tech
            </h1>
            <div className="w-full flex-1 mt-8">
              <SocialLogin />

              <div className="my-12 border-b text-center">
                <div
                  className="cursor-pointer leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 hover:bg-gray-600 hover:text-white"
                  onClick={() => setIsNew((prev) => !prev)}
                >
                  {isNew ? (
                    <div className="border-b-2  border-indigo-700">
                      <span className="font-bold">
                        Already Have an account?{" "}
                      </span>
                      Sign in with e-mail
                    </div>
                  ) : (
                    <div className="border-b-2  border-indigo-700">
                      <span className="font-bold">New Here? </span>Or sign up
                      with e-mail
                    </div>
                  )}
                </div>
              </div>
              {isNew ? <SignUp></SignUp> : <SignIn></SignIn>}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Authentication;
