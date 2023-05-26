import React, { useEffect } from "react";
import { SignInWithGoogle } from "./Login";
import { fetchStockDetails } from "../handlers/stock.handler";
import DisplayStock from "../components/DisplayStock";
import { Avatar, Button } from "antd";
function Home({ user }) {
  if (!user) {
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <SignInWithGoogle />
      </div>
    );
  }
  const logout = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
  };

  return (
    <div>
      <div className="flex mt-5 justify-center items-center space-x-2 ">
        <Avatar src={user.photo} alt={user.name} />
        <span>loggedin as {user.name}</span>
        <Button onClick={logout}>Logout</Button>
      </div>

      <DisplayStock />
    </div>
  );
}

export default Home;
