import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import SeasonSelector from "../components/insight/SelectMonthAndYear";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Insight() {
  const [entries, setEntries] = useState([]);
  const [userId, setUserId] = useState("123"); // Assuming you might want to change the user ID dynamically
  // const [error, setError] = useState("");

  // const api = axios.create({
  //   baseURL: "http://localhost:8080/api/insight/",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const fetchEntries = () => {
    axios
      .get(`api/insight/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  };
  // useEffect(() => {

  //   fetchEntries();
  // }, [userId]); // Ensures that if userId changes, the function will rerun

  // Rest of the code...

  // );
  /* <Logo /> */
  return (
    <>
      <Logo />
      <div className="grid grid-cols-5">
        <header className="col-span-1">
          <h1 className="text-2xl ml-4 mt-4">Dashboard</h1>
          <div className="flex">
            <p>여기에는 연, 월 선택</p>
            <SeasonSelector />
          </div>
          {/* Button to trigger the fetch operation */}
          <button
            onClick={fetchEntries}
            className="mt-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load Diary Entries
          </button>
        </header>
        <main className="col-span-4">
          <h2>Diary lists of date</h2>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <Link to={`/insight/${entry.id}`}>
                  {entry.date}, {entry.diary_id}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="text-xl ml-4 mt-4">지도 API 출동 예정</h2>
        </main>
      </div>
    </>
  );
}
