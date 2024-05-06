import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import SeasonSelector from "../components/insight/SeasonFilter";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import DiaryEntryCard from "../components/insight/DiaryCardView";
import { Select } from "@mui/material";
import Diary from "./Diary";
import KakaoMap from "../components/insight/DiaryMarksMap";

export default function Insight() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [diaries, setDiaries] = useState([]);
  const [userId, setUserId] = useState("123"); // Example user ID

  // Define fetchDiaries outside of useEffect
  const fetchDiaries = () => {
    axios
      .get(`api/insight/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDiaries(response.data); // Make sure response.data is an array
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  };

  // Use useEffect to call fetchDiaries when the component mounts or userId changes
  useEffect(() => {
    fetchDiaries();
  }, [userId]); // Dependency array includes userId to refetch when it changes
  // Filter diaries based on the selected month and year
  const filteredEntries = diaries.filter((entry) => {
    const entryDate = new Date(entry.diaryDate);
    return (
      entryDate.getMonth() + 1 === selectedMonth &&
      entryDate.getFullYear() === selectedYear
    );
  });

  return (
    <div className="grid grid-cols-5">
      <header className="col-span-1">
        <h1 className="text-2xl ml-4 mt-4">Dashboard</h1>
        <SeasonSelector
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
      </header>
      <main className="col-span-4">
        <h2>Diary lists of date</h2>
        <div className="flex overflow-x-auto space-x-4 px-4 py-2">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              gap: 2,
              p: 1,
            }}
          >
            {filteredEntries.map((entry) => (
              <DiaryEntryCard
                key={entry.diaryId}
                entry={entry}
                userId={userId}
              />
            ))}
          </Box>
        </div>
        <h2 className="text-xl ml-4 mt-4">지도 API 출동 예정</h2>
        <Box>
          <KakaoMap diaryEntries={filteredEntries} />
        </Box>
      </main>
    </div>
  );
}
