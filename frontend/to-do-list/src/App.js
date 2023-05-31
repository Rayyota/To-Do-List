import React from "react";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Todos from "./pages/Todos/Todos";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
