import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FormPage from "./pages/FormPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import NewForm from "./pages/NewForm";
import EditForm from "./pages/EditForm";
import Header from "./components/Header";

function App() {

  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

  function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Header isLogged={isLogged} />
        <div className="py-[9rem] flex flex-col w-full min-h-screen h-full bg-gradient-to-br from-pink to-blue px-[8vw]">
          {children}
        </div>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Layout><Home /></Layout>}></Route>
          <Route path="/home" element={<Layout><UserHome /></Layout>}></Route>
          <Route path="/new-form" element={<Layout><NewForm /></Layout>}></Route>
          <Route path="/form/:formId" element={<Layout><FormPage /></Layout>}></Route>
          <Route path="/form/:formId/edit" element={<Layout><EditForm /></Layout>}></Route>
          <Route path="/login" element={<Layout><Login /></Layout>}></Route>
          <Route path="/register" element={<Layout><Register /></Layout>}></Route>
          <Route path="*" element={<Layout><PageNotFound /></Layout>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
