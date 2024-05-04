import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Start from "./pages/Start";
import Main from "./pages/Main";
import Diary from "./pages/Diary";
import EditDiary from "./pages/EditDiary";
import Location from "./pages/Location";
import Insight from "./pages/insight";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
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
        <Route path="/insight" exact element={<Insight />} />
        <Route path="/diary" element={<Diary />} />
        {/* 특정 날짜의 일기 페이지에 대한 라우트 */}
        <Route path="/diary/:save_date" element={<Diary />} />
        <Route path="/edit" element={<EditDiary />} />
        <Route path="/search-location" element={<Location />} />
      </Routes>
    </Router>
  );
}

export default App;
