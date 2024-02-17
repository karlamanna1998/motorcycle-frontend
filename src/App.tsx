import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import PageNotFound from './pages/pageNotFound/pageNotFound';
import Brand from './pages/brands/brand';
import Motorcycles from './pages/motorcycles/motorcycles';
import PrivateRoutes from './utils/privateRoutes';
import Variants from './pages/variants/variants';
import AddUpdateVariant from './pages/addUpdateVariant/addUpdateVariant';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route  path ={'/brands'} element={<Brand/>}/>
      <Route  path ={'/motorcycles'} element={<Motorcycles/>}/>
      <Route  path ={'/variants'} element={<Variants/>}/>
      <Route  path ={'/add-variant'} element={<AddUpdateVariant/>}/>
      </Route>
      <Route  path ={'/login'} element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
