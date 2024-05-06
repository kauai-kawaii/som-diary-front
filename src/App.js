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

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((response) => {
        // response.data를 통해 서버 응답에 접근합니다.
        setMessage(response.data);
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/get-start" exact element={<Start />} />
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
