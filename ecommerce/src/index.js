import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import { AuthProvider } from "./Context API/Auth";
import 'antd/dist/reset.css';
import { SearchProvider } from "./Context API/Search";
import { CartProvider } from "./Context API/Cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </CartProvider>
      </SearchProvider>
    </AuthProvider>
      
    
  
);
