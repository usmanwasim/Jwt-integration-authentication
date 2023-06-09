import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import User from "./Components/User";
import Admin from "./Components/Admin";
import ProtectedUser from "./utils/ProtectedUser";
import ProtectedAdmin from "./utils/ProtectedAdmin";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<ProtectedUser />}>
          <Route path="" element={<User />} />
        </Route>
        <Route path="/admin" element={<ProtectedAdmin />}>
          <Route path="" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
