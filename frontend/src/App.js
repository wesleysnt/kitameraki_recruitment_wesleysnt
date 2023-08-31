import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './page/Main';
import Setting from './page/Setting';


const App = result => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/setting' element={<Setting/>}/>
      </Routes>
    </BrowserRouter>
  );
};



export default App