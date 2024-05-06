import React, { useState, useEffect } from "react";
import ToolOptions from "../get-tool-tips";

const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const chunkSize = 4;
const monthChunks = Array.from(
  { length: Math.ceil(months.length / chunkSize) },
  (_, i) => months.slice(i * chunkSize, i * chunkSize + chunkSize)
);
const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027];

export default function SeasonSelector() {
  let today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const handleMonthSelect = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
  };

  const handleYearSelect = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  // Any asynchronous operations needed at mount can be placed in useEffect.
  useEffect(() => {
    // Suppose you need to fetch data when the component mounts
    const fetchData = async () => {
      // Perform fetch operations here
    };
    fetchData();
  }, []); // Empty dependency array means this runs only once on mount.

  return (
    <div>
      <div>
        <h2>Select Month</h2>
        <ToolOptions
          content={
            <div className="w-32">
              {monthChunks.map((chunk, index) => (
                <div key={index} className="flex justify-between">
                  {chunk.map((month) => (
                    <div
                      key={month}
                      onClick={() => handleMonthSelect(month)}
                      style={{ padding: "5px", cursor: "pointer" }}
                      className="content-center"
                    >
                      {month}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          }
        >
          <button className="rounded-full ml-4 inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedMonth}
          </button>
        </ToolOptions>
      </div>
      <div>
        <h2>Select Year</h2>
        <ToolOptions
          content={
            <div className="w-32 rounded-full">
              {years.map((year) => (
                <div
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  style={{ padding: "5px", cursor: "pointer" }}
                  className="content-center "
                >
                  {year}
                </div>
              ))}
            </div>
          }
        >
          <button className="rounded-full ml-4 inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedYear}
          </button>
        </ToolOptions>
      </div>
    </div>
  );
}
