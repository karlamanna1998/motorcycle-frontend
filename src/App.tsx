import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import PageNotFound from './pages/pageNotFound/pageNotFound';
import Brand from './pages/brands/brand';
import Motorcycles from './pages/motorcycles/motorcycles';
import PrivateRoutes from './utils/privateRoutes';
import Variants from './pages/variants/variants';
import AddUpdateVariant from './pages/addUpdateVariant/addUpdateVariant';
import Navbar from './components/navbar/navbar';
import Loader from './components/loader/loader';
import { useAppDispatch, useAppSelector } from './hooks';
import { setLoader } from "./slices/loader";

function App() {

  const loader = useAppSelector(state => state.loader.loader)
  const dispatch = useAppDispatch()

  // useEffect(()=>{
  //   dispatch(setLoader(true))
  // },[])
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route  path ={'/brands'} element={<Brand/>}/>
      <Route  path ={'/motorcycles'} element={<Motorcycles/>}/>
      <Route  path ={'/variants'} element={<Variants/>}/>
      <Route  path ={'/add-variant'} element={<AddUpdateVariant/>}/>
      <Route  path ={'/add-variant/:id'} element={<AddUpdateVariant/>}/>
      </Route>
      <Route  path ={'/login'} element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    {loader && <Loader/>}
    </BrowserRouter>
  );
}

export default App;
