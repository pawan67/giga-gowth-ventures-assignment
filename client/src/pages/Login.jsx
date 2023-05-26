import React from "react";

function Login() {
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <SignInWithGoogle />
    </div>
  );
}

export const SignInWithGoogle = () => {
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
  };
  return (
    <button
      onClick={googleAuth}
      className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
    >
      Sign in with Google
    </button>
  );
};

export default Login;
