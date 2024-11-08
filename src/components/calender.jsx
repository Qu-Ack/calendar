import { useState, useEffect } from "react";

const CURR_YEAR = 2024;

const monthMap = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const yearMap = [2024, 2025, 2026, 2027];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const events = [
  {
    Name: "Today is the day of reckoning",
    Date: new Date(2024, 0, 16),
    Desc: "An Over the top awesome event like never before, blow your brains out",
    Link: "https://www.google.com",
  },
  {
    Name: "Today is the day of reckoning",
    Date: new Date(2024, 1, 16),
    Desc: "An Over the top awesome event like never before, blow your brains out",
    Link: "https://www.google.com",
  },
  {
    Name: "Today is the day of reckoning",
    Date: new Date(2024, 11, 16),
    Desc: "An Over the top awesome event like never before, blow your brains out",
    Link: "https://www.google.com",
  },
];

// events are stored in memory currently
// we can get the events either from database on initial load of the page
// if the scale is too large maybe setup indexes on the db and query the database whenever a month changes for that particular month and year
// this way we don't have to get all the events that the user might not see

export default function Calendar() {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(CURR_YEAR);
  const [daysArray, setDaysArray] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  useEffect(() => {
    const daysInAMonth = daysInMonth(month + 1, year);
    const firstDayOffset = getFirstDayOfMonth(month + 1, year);

    const days = Array(firstDayOffset).fill(null);
    for (let i = 1; i <= daysInAMonth; i++) {
      days.push(i);
    }
    setDaysArray(days);

    const monthEvents = events.filter(
      (event) =>
        event.Date.getFullYear() === year && event.Date.getMonth() === month,
    );
    setFilteredEvents(monthEvents);
  }, [month, year]);

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function getFirstDayOfMonth(month, year) {
    return new Date(year, month - 1, 1).getDay();
  }

  function handleMonthChange(e) {
    setMonth(Number(e.target.value));
  }

  function handleYearChange(e) {
    setYear(Number(e.target.value));
  }

  return (
    <div className="h-screen w-screen bg-gray-300 flex flex-col items-center justify-center">
      <div>
        <select
          name="month"
          id="month"
          onChange={handleMonthChange}
          className="mb-4"
        >
          <option value="">--PLEASE SELECT A MONTH--</option>
          {monthMap.map((month, index) => (
            <option value={index} key={index}>
              {month}
            </option>
          ))}
        </select>

        <select
          name="year"
          id="year"
          onChange={handleYearChange}
          className="mb-4"
        >
          <option value="">--PLEASE SELECT A YEAR--</option>
          {yearMap.map((year, index) => (
            <option value={year} key={index}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="calendar grid grid-cols-7 gap-2 w-full max-w-2xl mb-2">
        {dayNames.map((dayName, index) => (
          <div
            key={index}
            className="h-12 flex items-center justify-center font-bold text-gray-700"
          >
            {dayName}
          </div>
        ))}
      </div>

      <div className="calendar grid grid-cols-7 gap-2 w-full max-w-2xl relative">
        {daysArray.map((day, index) => {
          const event = filteredEvents.find((ev) => ev.Date.getDate() === day);

          return (
            <div
              key={index}
              className={`h-20 border border-white flex items-center justify-center relative ${
                day
                  ? event
                    ? "bg-green-600 text-white cursor-pointer"
                    : "bg-red-900 text-white"
                  : "bg-transparent"
              }`}
              onMouseEnter={() => event && setHoveredEvent(event)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {day}
              {hoveredEvent === event && (
                <div className="absolute top-24 w-56 p-3 bg-white border border-gray-400 rounded-lg shadow-lg text-sm text-black z-10">
                  <strong>{event.Name}</strong>
                  <p>{event.Desc}</p>
                  <a
                    href={event.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    More Info
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
