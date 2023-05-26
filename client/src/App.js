import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "antd/dist/reset.css";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`,
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
