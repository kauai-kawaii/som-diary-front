import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMonthAndYear() {
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="month-select-label">Month</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          autoWidth
          label="Month"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          autoWidth
          label="Year"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i} value={2020 + i}>{2020 + i}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
