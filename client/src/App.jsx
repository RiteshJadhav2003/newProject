import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Donation from './pages/donation';
import Edit from './pages/edit';


export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<Signin />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="donation" element={<Donation />} />
        <Route path="edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}
