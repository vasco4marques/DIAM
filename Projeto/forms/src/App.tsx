import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FormPage from "./pages/FormPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home/logged-in" element={<UserHome/>}></Route>
          <Route path="/form/:formId" element={<FormPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
