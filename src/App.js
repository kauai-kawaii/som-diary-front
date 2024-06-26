import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Start from "./pages/Start";
import Main from "./pages/Main";
import Diary from "./pages/Diary";
import EditDiary from "./pages/EditDiary";
import EditLocation from "./pages/EditLocation";
import Location from "./pages/Location";
import Insight from "./pages/Insight";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/get-start"
          exact
          element={
            <ProtectedRoute>
              <Start />
            </ProtectedRoute>
          }
        />
        <Route path="/main" exact element={<Main />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/edit/:save_date" element={<EditDiary />} />
        <Route path="/search-location/:save_date" element={<Location />} />
        <Route path="/edit/search-location/:save_date" element={<EditLocation />} />
        <Route path="/diary/:save_date" element={<Diary />} />


      </Routes>
    </Router>
  );
}

export default App;
