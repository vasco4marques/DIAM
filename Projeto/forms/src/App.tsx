import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FormPage from "./pages/FormPage";

function App(){ 
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element ={<Home />}></Route>
          <Route path="/form/:formId" element={<FormPage />}></Route>
          <Route path="*" element ={<PageNotFound />} ></Route>

        </Routes>        
      </BrowserRouter>
    
    </>
  )
}

export default App