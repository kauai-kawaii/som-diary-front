import React, { useState, useEffect } from "react";
import ToolOptions from "../get-tool-tips";

const months = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

// Function to chunk the months array into groups of 4
const chunkSize = 4;
const monthChunks = Array.from({ length: Math.ceil(months.length / chunkSize) }, (_, i) =>
    months.slice(i * chunkSize, i * chunkSize + chunkSize)
);
const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027];

export default async function GetMusicsByYearAndMonth() {
    // Get the current date
    let today = new Date();
    let todayQuery = today.toISOString().substring(0, 10);

    // Set the initial state for the selected month and year
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const handleMonthSelect = (selectedMonth) => {
        setSelectedMonth(selectedMonth);
    };

    const handleYearSelect = (selectedYear) => {
        setSelectedYear(selectedYear);
    };

    const [tracksData, setTracksData] = useState(null);
    useEffect(() => {
        // This useEffect is just a placeholder to simulate fetching data or similar side effects
        // It was inspired by the useEffect seen in the year selection file to fetch insights
        // Replace with actual logic as needed
        console.log("Component did mount or update due to year or month change");
        // Make the fetch request
        const apiUrl = `http://localhost:8081/insight/monthAndYear?year=${selectedYear}&month=${selectedMonth}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setTracksData(data);
                // Handle the data returned from the server
                console.log(`Period: ${selectedYear}-${selectedMonth}`);
                console.log('Received data:', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [selectedYear, selectedMonth]); // Dependencies to re-run the effect


    // Construct the URL


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
                {years.map((year, index) => (
                    <button
                        key={index}
                        onClick={() => handleYearSelect(year)}
                        className={`button ${year === selectedYear ? "selected" : ""}`}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );
}
