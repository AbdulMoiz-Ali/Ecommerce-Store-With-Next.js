import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const TimeRangePicker = () => {
  const [startTime, setStartTime] = useState("08:00 am");
  const [endTime, setEndTime] = useState("08:00 pm");
  const [error, setError] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
    const period = i < 12 ? "am" : "pm";
    const formattedHour = hour.toString().padStart(2, "0");

    // Add all minutes from 00 to 59
    const minutes = Array.from({ length: 60 }, (_, m) =>
      m.toString().padStart(2, "0")
    );

    // Return all time options for this hour
    return minutes.map((minute) => `${formattedHour}:${minute} ${period}`);
  }).flat();

  const validateTimeRange = (start, end) => {
    const [startHour, startPeriod] = start.split(" ");
    const [endHour, endPeriod] = end.split(" ");

    const startDate = new Date(`2000/01/01 ${startHour} ${startPeriod}`);
    const endDate = new Date(`2000/01/01 ${endHour} ${endPeriod}`);

    if (startDate >= endDate) {
      setError("Start time must be less than end time");
      return false;
    }
    setError("");
    return true;
  };

  const TimeDropdown = ({ label, value, onChange, isOpen, setIsOpen }) => (
    <div className="relative w-40">
      <p className="text-gray-400 mb-1">{label}</p>
      <div
        className="bg-[var(--darker-bg)] rounded-md px-4 py-2 w-full flex justify-between items-center cursor-pointer border border-gray-600 hover:border-[var(--primary)] transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[var(--lime-white)]">{value}</span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--primary)] transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="a left-0 top-full mt-1 p-2 w-full max-h-60 z-50 bg-[var(--darker-bg)] text-[var(--lime-white)] rounded-md shadow-lg border border-[var(--primary)] overflow-auto hide-scrollbar">
          {times.map((time) => (
            <div
              key={time}
              className="px-4 py-2 cursor-pointer hover:bg-[var(--primary)] hover:text-[var(--darker-bg)] transition-colors"
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start space-x-4 flex-wrap relative z-8 bg-[var(--darker-bg)] rounded-md p-4">
        <TimeDropdown
          label="Start"
          value={startTime}
          onChange={(newTime) => {
            setStartTime(newTime);
            validateTimeRange(newTime, endTime);
          }}
          isOpen={startOpen}
          setIsOpen={setStartOpen}
        />

        <div className="text-[var(--primary)] mt-8">-</div>

        <TimeDropdown
          label="End"
          value={endTime}
          onChange={(newTime) => {
            setEndTime(newTime);
            validateTimeRange(startTime, newTime);
          }}
          isOpen={endOpen}
          setIsOpen={setEndOpen}
        />
      </div>

      {error && (
        <div className="w-full mt-2 text-red-500 text-sm absolute left-0">
          {error}
        </div>
      )}
    </div>
  );
};

export default TimeRangePicker;
