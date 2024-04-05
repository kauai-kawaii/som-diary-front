import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiaryTrackSelector() {
    const [selectedYear, setYear] = useState(new Date().getFullYear());
    const [selectedMonth, setMonth] = useState(new Date().getMonth() + 1); // JavaScript months are 0-indexed
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get(`/insight/tracks?year=${selectedYear}&month=${selectedMonth}`);
                setTracks(response.data);
            } catch (error) {
                console.error('Error fetching tracks', error);
            }
        };

        fetchTracks();
    }, [selectedYear, selectedMonth]);

    return (
        <div>
            <label>
                Year:
                <input type="number" value={selectedYear} onChange={e => setYear(e.target.value)} />
            </label>
            <label>
                Month:
                <input type="number" value={selectedMonth} onChange={e => setMonth(e.target.value)} />
            </label>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>ID: {track.id}</li>
                ))}
            </ul>
        </div>
    );
}

export default DiaryTrackSelector;
