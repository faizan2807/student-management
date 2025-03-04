//import React, { StrictMode } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import bootsrap from "bootstrap"





import { Login } from './components/login';
import { Register } from './components/register';
import { Home } from './components/home';
import { Add } from './components/add';
import { Edit } from './components/edit';
import { Dashboard } from './components/dashboard';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Routes, Route } from "react-router-dom";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<CookiesProvider>
    
<BrowserRouter>
<Routes>
  <Route path='/' element={<Dashboard /> }> </Route>
 <Route path="/login"  element={<Login/>}></Route>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/register' element={<Register/>}></Route> 
  <Route path='/add' element={<Add/>}></Route>
  <Route path='/edit' element={<Edit/>}></Route>
  <Route path='*' element="not found"></Route>
  
</Routes >
</BrowserRouter>
</CookiesProvider>

);


reportWebVitals();
